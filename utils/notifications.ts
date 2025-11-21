export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const scheduleReminder = (eventTitle: string, eventDate: string) => {
  const reminders = JSON.parse(localStorage.getItem("hillywood_reminders") || "[]");
  
  const reminder = {
    id: Date.now().toString(),
    title: eventTitle,
    date: eventDate,
    createdAt: new Date().toISOString(),
  };

  reminders.push(reminder);
  localStorage.setItem("hillywood_reminders", JSON.stringify(reminders));

  // Schedule notification for 1 hour before event
  const eventTime = new Date(eventDate).getTime();
  const reminderTime = eventTime - (60 * 60 * 1000); // 1 hour before
  const timeUntilReminder = reminderTime - Date.now();

  if (timeUntilReminder > 0) {
    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("Hillywood Reminder", {
          body: `${eventTitle} starts in 1 hour!`,
          icon: "/favicon.ico",
          tag: reminder.id,
        });
      }
    }, timeUntilReminder);
  }

  return reminder;
};

export const getReminders = () => {
  return JSON.parse(localStorage.getItem("hillywood_reminders") || "[]");
};

export const removeReminder = (id: string) => {
  const reminders = getReminders();
  const filtered = reminders.filter((r: any) => r.id !== id);
  localStorage.setItem("hillywood_reminders", JSON.stringify(filtered));
};
