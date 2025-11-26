const BASE_API = "/api";

/**
 * @param {string} mapId
 * @param {string} hlocId
 * @param {string} dataSetId
 */
export async function getTransform(mapId, hlocId, dataSetId) {
  const url = `${BASE_API}/maps/${mapId}/hloc/${hlocId}/transform?dataSetId=${dataSetId}`;
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    throw new Error(`GET transform failed: ${res.status}`);
  }

  return await res.json();
}

/**
 * @param {string} mapId
 * @param {string} hlocId
 * @param {string} dataSetId
 * @param {object} payload { latitude, longitude, height, matrix }
 */
export async function postTransform(mapId, hlocId, dataSetId, payload) {
  const url = `${BASE_API}/maps/${mapId}/hloc/${hlocId}/transform?dataSetId=${dataSetId}`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`POST transform failed: ${res.status}`);
  }

  return await res.json();
}
