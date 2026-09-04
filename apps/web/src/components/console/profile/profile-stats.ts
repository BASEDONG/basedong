/** Header stats for 个人资料 (额度 / used / requests) from Backend self. */

export type ProfileHeaderStats = {
  quota: number;
  usedQuota: number;
  requestCount: number;
};

export function profileHeaderStats(self: {
  quota?: number;
  used_quota?: number;
  request_count?: number;
}): ProfileHeaderStats {
  return {
    quota: typeof self.quota === "number" ? self.quota : 0,
    usedQuota: typeof self.used_quota === "number" ? self.used_quota : 0,
    requestCount:
      typeof self.request_count === "number" ? self.request_count : 0,
  };
}
