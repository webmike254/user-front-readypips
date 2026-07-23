/**
 * PocketBase service layer architecture.
 * This provides typed models, collection-based services, and a centralized API.
 * Ready for integration with a real PocketBase backend.
 */

// ---- Typed Models ----

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  role: "student" | "instructor" | "moderator" | "admin" | "finance" | "superadmin";
  plan: "free" | "bronze" | "silver" | "gold" | "platinum" | "diamond";
  created: string;
  updated: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  hours: number;
  rating: number;
  image: string;
  category: string;
  instructor: string;
  enrolled: number;
  progress?: number;
  completedLessons?: number;
  created: string;
}

export interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  date: string;
  time: string;
  duration: string;
  difficulty: string;
  category: string;
  description: string;
  registered: number;
  seats: number;
  language: string;
  status: "Live" | "Starting Soon" | "Upcoming" | "Completed" | "Cancelled";
  thumbnail: string;
  created: string;
}

export interface Certificate {
  id: string;
  title: string;
  course: string;
  issuedDate: string;
  certificateId: string;
  grade: string;
  score: number;
  skills: string[];
  image: string;
  status: "earned" | "in_progress" | "available";
  created: string;
}

export interface Discussion {
  id: string;
  title: string;
  category: string;
  author: string;
  authorAvatar: string;
  role: string;
  replies: number;
  views: number;
  lastActivity: string;
  pinned: boolean;
  created: string;
}

export interface DownloadItem {
  id: string;
  name: string;
  description: string;
  category: "courses" | "tools" | "templates" | "signals";
  type: string;
  size: string;
  date: string;
  downloaded: boolean;
  premium: boolean;
  popular: boolean;
  created: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "challenge" | "mentor" | "live";
  read: boolean;
  created: string;
}

export interface BillingRecord {
  id: string;
  invoice: string;
  date: string;
  plan: string;
  amount: string;
  method: string;
  status: "Paid" | "Pending" | "Refunded";
  created: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  profit: string;
  wins: number;
  streak: number;
  created: string;
}

// ---- Service Layer (stubs for real PocketBase integration) ----

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class PocketBaseService {
  private baseUrl: string;

  constructor(baseUrl = "https://api.readypips.com") {
    this.baseUrl = baseUrl;
  }

  async getUser(id: string): Promise<User> {
    await delay(300);
    return {
      id,
      email: "ahmed.bader@gmail.com",
      name: "Ahmed Bader",
      username: "ahmed_trader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "student",
      plan: "diamond",
      created: "2022-05-15T00:00:00Z",
      updated: "2023-10-22T00:00:00Z",
    };
  }

  async listCourses(page = 1, perPage = 20): Promise<{ items: Course[]; total: number }> {
    await delay(400);
    return {
      items: [],
      total: 0,
    };
  }

  async listDiscussions(page = 1, perPage = 20): Promise<{ items: Discussion[]; total: number }> {
    await delay(400);
    return {
      items: [],
      total: 0,
    };
  }

  async listNotifications(page = 1, perPage = 20): Promise<{ items: Notification[]; total: number }> {
    await delay(300);
    return {
      items: [],
      total: 0,
    };
  }

  async listBilling(page = 1, perPage = 20): Promise<{ items: BillingRecord[]; total: number }> {
    await delay(300);
    return {
      items: [],
      total: 0,
    };
  }

  async listCertificates(page = 1, perPage = 20): Promise<{ items: Certificate[]; total: number }> {
    await delay(400);
    return {
      items: [],
      total: 0,
    };
  }

  async listDownloads(page = 1, perPage = 20): Promise<{ items: DownloadItem[]; total: number }> {
    await delay(400);
    return {
      items: [],
      total: 0,
    };
  }

  async subscribeToCollection(collection: string, callback: (data: unknown) => void) {
    // Realtime subscription stub - would connect to PocketBase SSE
    console.log(`Subscribed to ${collection}`);
    return () => {
      console.log(`Unsubscribed from ${collection}`);
    };
  }
}

export const pb = new PocketBaseService();
export type { PocketBaseService };
