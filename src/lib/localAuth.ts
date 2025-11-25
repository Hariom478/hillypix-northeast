import Cookies from "js-cookie";

export function saveServerAuth(serverUser: any, token?: string, current_device_token?: string) {
  if (typeof window === "undefined") return;

  try {
    const mergedUser = mergeServerUser(serverUser);

    const cookieOptions = {
      expires: 7,
      path: "/",
      sameSite: "Lax",
      // secure: process.env.NODE_ENV === "production" // uncomment for HTTPS only
    };

    // Save cookies exactly like your existing pattern
    if (token) Cookies.set("UserToken", token, cookieOptions);
    if (current_device_token) Cookies.set("CurrentDeviceToken", current_device_token, cookieOptions);
    
    Cookies.set("UserData", JSON.stringify(mergedUser), cookieOptions);

  } catch (err) {
    console.error("Error saving auth cookies", err);
  }
}

// ----------------------
// Get User Token
// ----------------------
export function getToken() {
  return typeof window !== "undefined" ? Cookies.get("UserToken") || null : null;
}

// ----------------------
// Get Current Device Token
// ----------------------
export function getCurrentDeviceToken() {
  return typeof window !== "undefined" ? Cookies.get("CurrentDeviceToken") || null : null;
}

// ----------------------
// Get User Data
// ----------------------
export function getUser() {
  if (typeof window === "undefined") return null;

  try {
    const cookieUser = Cookies.get("UserData");
    return cookieUser ? JSON.parse(cookieUser) : null;
  } catch {
    return null;
  }
}

// ----------------------
// Clear Cookies
// ----------------------
export function clearAuth() {
  if (typeof window === "undefined") return;

  Cookies.remove("UserToken", { path: "/" });
  Cookies.remove("CurrentDeviceToken", { path: "/" });
  Cookies.remove("UserData", { path: "/" });
}

// ----------------------
// Merge User (Optional Same Logic)
// ----------------------
function buildName(user: any) {
  if (!user) return "";
  return (
    user.name ||
    `${user.first_name || user.firstname || user.firstName || ""} ${user.last_name || user.lastname || user.lastName || ""}`.trim()
  );
}

export function mergeServerUser(serverUser: any) {
  const existing = getUser() || {};
  const merged = { ...(serverUser || {}), ...(existing || {}) };
  merged.name = buildName(merged) || serverUser?.name || existing?.name || "";
  return merged;
}
