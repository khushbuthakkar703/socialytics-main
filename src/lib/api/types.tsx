export type Campaign = {
  id: string;
  searchQuery: string;
  monitorCursor: string | null;
  numberOfLikes: number;
  numberOfRts: number;
  numberOfComments: number;
  rtPercent: number;
  quotePercent: number;
  replyPercent: number;
  deviation: number;
  impressionMin: number;
  impressionMax: number;
  videoViewsRatio: number;
  initialPercent: number;
  dripMinutes: number;
  status: "ACTIVE" | "PAUSED" | "ENDED" | "PENDING";
  tags: string[];
  startDate: Date | string;
  endDate?: Date | string;
};

export type GetAllCampaignsResponse = Array<Campaign>;

export type GetDbCampaignsResponse = {
  data: Campaign[];
  totalRecords: number;
  pageCount: number;
  page: number;
  pageSize: number;
  orderBy: any;
};

export type GetClientsResponse = Array<{
  id: string;
  username: string;
  twitterId: string;
  monitorCursor: string;
  numberOfLikes: number;
  numberOfRts: number;
  numberOfComments: number;
  rtPercent: number;
  quotePercent: number;
  replyPercent: number;
  deviation: number;
  isSpoofAccount: boolean;
  deleted: boolean;
  impressionMin: number;
  impressionMax: number;
  videoViewsRatio: number;
  initialPercent: number;
  dripMinutes: number;
  tags: Array<string>;
  group: Array<{
    id: string;
    label: string;
  }>;
}>;

export type ClientsTweetHistory = Array<{
  id: string;
  url: string;
  text: string;
  startDate: string;
  impressions: number;
  totalLikes: number;
  organicLikes: number;
  promotedLikes: number;
  totalRetweets: number;
  organicRetweets: number;
  promotedRetweets: number;
}>;

export type ClientActiveCampaigns = Array<{
  id: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date | undefined;
  status: string;
}>;

export type Pagination = {
  totalRecords: number;
  totalPages: number;
  page: number;
};

export type GetClientsTweetHistoryResponse = {
  pagination: Pagination;
  tweets: ClientsTweetHistory;
};

export type UpdateOrganizationPayload = {
  name: string;
  slug: string;
  clients: Array<{
    id: string;
    username: string;
    twitterId: string;
    monitorCursor: string;
    numberOfLikes: number;
    numberOfRts: number;
    numberOfComments: number;
    rtPercent: number;
    quotePercent: number;
    replyPercent: number;
    deviation: number;
    isSpoofAccount: boolean;
    deleted: boolean;
    impressionMin: number;
    impressionMax: number;
    videoViewsRatio: number;
    initialPercent: number;
    dripMinutes: number;
    tags: Array<string>;
    group: Array<{
      id: string;
      label: string;
    }>;
  }>;
  mainClient: {
    id: string;
    username: string;
    twitterId: string;
    monitorCursor: string;
    numberOfLikes: number;
    numberOfRts: number;
    numberOfComments: number;
    rtPercent: number;
    quotePercent: number;
    replyPercent: number;
    deviation: number;
    isSpoofAccount: boolean;
    deleted: boolean;
    impressionMin: number;
    impressionMax: number;
    videoViewsRatio: number;
    initialPercent: number;
    dripMinutes: number;
    tags: Array<string>;
    group: Array<{
      id: string;
      label: string;
    }>;
  };
  campaigns?: Campaign[];
  firstMemberEmail?: string;
};

export type BoostedTweetInterface = {
  id: string;
  comments: number;
  likes: number;
  retweets: number;
  impressions?: number;
  videoViews?: number;
  initialPercent?: number;
  dripMinutes?: number;
  explanation?: string;
};

export type CampaignInterface = {
  id: string;
  campaignName: string;
  organicTweet: boolean;
  scrap: boolean;
};

export interface Tweet {
  id: string;
  url: string;
  text: string;
  createdAt: string;
  totalImpressions: number;
}

export interface TweetsInterface {
  pagination: Pagination;
  tweets: Tweet[];
}
