export function getAuth() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function getUser() {
  if (typeof window === "undefined") return null;
  try {
    const lite = localStorage.getItem("hillypix-user");
    if (lite) return JSON.parse(lite);
    const auth = getAuth();
    return auth?.user || null;
  } catch (e) {
    return null;
  }
}

function buildName(user: any) {
  if (!user) return "";
  return (
    user.name ||
    `${user.first_name || user.firstname || user.firstName || ""} ${user.last_name || user.lastname || user.lastName || ""}`.trim()
  );
}

// merge server user with existing local user; local fields take precedence
export function mergeServerUser(serverUser: any) {
  const existing = getUser() || {};
  const merged = { ...(serverUser || {}), ...(existing || {}) };
  merged.name = buildName(merged) || serverUser?.name || existing?.name || "";
  return merged;
}

export function saveServerAuth(serverUser: any, token?: string, current_device_token?: string) {
  if (typeof window === "undefined") return;
  try {
    const mergedUser = mergeServerUser(serverUser);
    const authObj: any = { token: token || null, user: mergedUser };
    if (current_device_token) authObj.current_device_token = current_device_token;
    localStorage.setItem("auth", JSON.stringify(authObj));
    localStorage.setItem("hillypix-user", JSON.stringify(mergedUser));
  } catch (e) {
    // fallback: try to write raw server user as hillypix-user
    try {
      if (serverUser) localStorage.setItem("hillypix-user", JSON.stringify(serverUser));
    } catch (e2) {
      // ignore
    }
  }
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("auth");
    localStorage.removeItem("hillypix-user");
  } catch (e) {
    // ignore
  }
}
