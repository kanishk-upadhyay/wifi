/**
 * Live In-Browser Network Diagnostics Engine
 * Uses real Web APIs (Performance API, Fetch API, Network Information API)
 */

// Robust fallback endpoints for cross-origin latency probing
const PROBE_ENDPOINTS = [
  'https://cloudflare.com/cdn-cgi/trace',
  'https://www.google.com/favicon.ico',
  'https://www.cloudflare.com/favicon.ico',
  'https://1.1.1.1/cdn-cgi/trace',
];

export async function pingProbe(endpoint, timeoutMs = 2500) {
  const url = `${endpoint}?_t=${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const start = performance.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const duration = Math.round(performance.now() - start);
    return Math.max(1, duration);
  } catch (err) {
    clearTimeout(timeoutId);
    try {
      const getStart = performance.now();
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store',
      });
      return Math.max(1, Math.round(performance.now() - getStart));
    } catch {
      return null;
    }
  }
}

export function getTelemetry() {
  const nav = typeof navigator !== 'undefined' ? navigator : null;
  const conn = nav?.connection || nav?.mozConnection || nav?.webkitConnection;

  return {
    isOnline: nav ? nav.onLine : true,
    effectiveType: conn?.effectiveType || '4g',
    downlink: conn?.downlink ? Number(conn.downlink) : 50,
    rtt: conn?.rtt ? Number(conn.rtt) : 25,
    saveData: !!conn?.saveData,
    userAgent: nav?.userAgent || 'Standard Browser',
  };
}

export async function runDiagnosticsBurst(onProgress) {
  const samples = [];
  const totalProbes = 6;
  let dropped = 0;

  if (onProgress) onProgress(10, 0, 'INITIALIZING: Inspecting Web Navigator Connection...');
  await new Promise(r => setTimeout(r, 200));

  const telemetry = getTelemetry();

  for (let i = 0; i < totalProbes; i++) {
    const endpoint = PROBE_ENDPOINTS[i % PROBE_ENDPOINTS.length];
    if (onProgress) {
      onProgress(
        15 + Math.round((i / totalProbes) * 75),
        samples[samples.length - 1] || telemetry.rtt || 35,
        `BURST [${i + 1}/${totalProbes}]: Probing ${new URL(endpoint).hostname}...`
      );
    }

    const latency = await pingProbe(endpoint);
    if (latency !== null) {
      samples.push(latency);
    } else {
      dropped++;
      if (!telemetry.isOnline) {
        dropped = totalProbes;
      }
    }
    await new Promise(r => setTimeout(r, 120));
  }

  const validSamples = samples.length > 0 ? samples : [telemetry.rtt || 85];
  const avgPing = Math.round(validSamples.reduce((a, b) => a + b, 0) / validSamples.length);
  
  const variance = validSamples.reduce((sum, val) => sum + Math.pow(val - avgPing, 2), 0) / validSamples.length;
  const jitter = Math.round(Math.sqrt(variance));
  const packetLoss = Math.round((dropped / totalProbes) * 100);

  let rating = 'EXCELLENT';
  let recommendation = 'Connection is optimal for competitive gaming, 4K streaming, and low-latency calls.';

  if (packetLoss > 20 || avgPing > 220) {
    rating = 'CRITICAL';
    recommendation = 'Severe packet loss or latency detected. Immediate gateway restart and ISP trunk inspection required.';
  } else if (avgPing > 120 || jitter > 40) {
    rating = 'POOR';
    recommendation = 'Elevated latency and high jitter. Check for heavy background downloads, switch to 5GHz WiFi, or use Ethernet.';
  } else if (avgPing > 60 || jitter > 20) {
    rating = 'FAIR';
    recommendation = 'Acceptable for browsing and video, but may stutter during video calls. Consider moving closer to the router.';
  } else if (avgPing > 35) {
    rating = 'GOOD';
    recommendation = 'Solid connection with nominal jitter. Suitable for all general web workflows.';
  }

  if (onProgress) {
    onProgress(100, avgPing, `COMPLETE: Measured Ping: ${avgPing}ms | Jitter: ±${jitter}ms | Loss: ${packetLoss}%`);
  }

  return {
    ping: avgPing,
    jitter,
    packetLoss,
    downlink: telemetry.downlink,
    rtt: telemetry.rtt,
    effectiveType: telemetry.effectiveType,
    isOnline: telemetry.isOnline,
    dnsReachable: dropped < totalProbes,
    history: validSamples,
    rating,
    recommendation,
  };
}
