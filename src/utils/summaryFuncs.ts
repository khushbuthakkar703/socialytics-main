interface SummaryType {
  followersData: Record<string, number>;
  tweetsData: Record<
    string,
    {
      count: number;
      likeCount: number;
      promotedLikeCount: number;
      quoteCount: number;
      replyCount: number;
      retweetCount: number;
      promotedRetweetCount: number;
      engagements: number;
      promotedEngagements: number;
      impressions: number;
      promotedImpressions: number;
    }
  >;
  previousPeriod: {
    totalEngagements: number;
    totalImpressions: number;
    totalTweets: number;
    totalRetweets: number;
    totalQuotes: number;
    totalReplies: number;
    totalLikes: number;
  };
}
interface ClientNumbers {
  count: number;
  engagements: number;
  impressions: number;
  promotedImpressions: number;
  promotedEngagements: number;
  quoteCount: number;
  retweetCount: number;
  promotedRetweetCount: number;
  replyCount: number;
  likeCount: number;
  promotedLikeCount: number;
  avgCount: number;
  avgEngagements: number;
  avgImpressions: number;
  avgQuoteCount: number;
  avgRetweetCount: number;
  avgReplyCount: number;
  avgLikeCount: number;
  avgPromotedLikeCount: number;
  avgPromotedImpressions: number;
  avgPromotedEngagements: number;
  avgPromotedRetweets: number;
  organicLikes: number;
  avgOrganicLikes: number;
  organicRetweets: number;
  avgOrganicRetweets: number;
}

export const getTotalAndAvgNumber = (data: SummaryType) => {
  const { tweetsData } = data;
  const tweetDataArr = tweetsData ? Object.values(tweetsData) : [];

  const total = tweetDataArr.reduce(
    (acc, curr) => ({
      count: acc.count + curr.count,
      engagements: acc.engagements + curr.engagements,
      impressions: acc.impressions + curr.impressions,
      quoteCount: acc.quoteCount + curr.quoteCount,
      retweetCount: acc.retweetCount + curr.retweetCount,
      replyCount: acc.replyCount + curr.replyCount,
      likeCount: acc.likeCount + curr.likeCount,
      promotedLikeCount: acc.promotedLikeCount + curr.promotedLikeCount,
      promotedRetweetCount:
        acc.promotedRetweetCount + curr.promotedRetweetCount,
      promotedEngagements: acc.promotedEngagements + curr.promotedEngagements,
      promotedImpressions: acc.promotedImpressions + curr.promotedImpressions,
    }),
    {
      count: 0,
      engagements: 0,
      impressions: 0,
      quoteCount: 0,
      retweetCount: 0,
      replyCount: 0,
      likeCount: 0,
      promotedLikeCount: 0,
      promotedEngagements: 0,
      promotedImpressions: 0,
      promotedRetweetCount: 0,
    }
  );

  console.log(total);
  const tweetDataCount = tweetDataArr.length;
  return {
    count: total.count ?? 0,
    engagements: total.engagements ?? 0,
    impressions: total.impressions ?? 0,
    quoteCount: total.quoteCount ?? 0,
    retweetCount: total.retweetCount ?? 0,
    replyCount: total.replyCount ?? 0,
    likeCount: total.likeCount ?? 0,
    promotedLikeCount: total.promotedLikeCount ?? 0,
    promotedEngagements: total.promotedEngagements ?? 0,
    promotedImpressions: total.promotedImpressions ?? 0,
    promotedRetweetCount: total.promotedRetweetCount ?? 0,
    avgCount: +(total.count / tweetDataCount).toFixed(1) ?? 0,
    avgEngagements: +(total.engagements / tweetDataCount).toFixed(1) ?? 0,
    avgImpressions: +(total.impressions / tweetDataCount).toFixed(1) ?? 0,
    avgQuoteCount: +(total.quoteCount / tweetDataCount).toFixed(1) ?? 0,
    avgRetweetCount: +(total.retweetCount / tweetDataCount).toFixed(1) ?? 0,
    avgReplyCount: +(total.replyCount / tweetDataCount).toFixed(1) ?? 0,
    avgLikeCount: +(total.likeCount / tweetDataCount).toFixed(1) ?? 0,
    avgPromotedLikeCount:
      +(total.promotedLikeCount / tweetDataCount).toFixed(1) ?? 0,
    avgPromotedImpressions:
      +(total.promotedImpressions / tweetDataCount).toFixed(1) ?? 0,
    avgPromotedEngagements:
      +(total.promotedEngagements / tweetDataCount).toFixed(1) ?? 0,
    avgPromotedRetweets:
      +(total.promotedRetweetCount / tweetDataCount).toFixed(1) ?? 0,
    organicLikes: total.likeCount - total.promotedLikeCount ?? 0,
    avgOrganicLikes:
      +((total.likeCount - total.promotedLikeCount) / tweetDataCount).toFixed(
        1
      ) ?? 0,
    organicRetweets: total.retweetCount - total.promotedRetweetCount ?? 0,
    avgOrganicRetweets:
      +(
        (total.retweetCount - total.promotedRetweetCount) /
        tweetDataCount
      ).toFixed(1) ?? 0,
  };
};

export function calculatePercentage(val1: number, val2: number): number {
  if (val2 === 0 || isNaN(val2)) {
    return val1 > 0 ? 100 : 0;
  }
  if (isNaN(val1)) return -100;
  return ((val1 - val2) / val2) * 100 || 0;
}

export function calculatePercentageDiff(
  data: ClientNumbers,
  compareTo: ClientNumbers
): ClientNumbers {
  const result: ClientNumbers = {
    count: calculatePercentage(data.count, compareTo.count),
    engagements: calculatePercentage(data.engagements, compareTo.engagements),
    impressions: calculatePercentage(data.impressions, compareTo.impressions),
    quoteCount: calculatePercentage(data.quoteCount, compareTo.quoteCount),
    retweetCount: calculatePercentage(
      data.retweetCount,
      compareTo.retweetCount
    ),
    replyCount: calculatePercentage(data.replyCount, compareTo.replyCount),
    likeCount: calculatePercentage(data.likeCount, compareTo.likeCount),
    promotedLikeCount: calculatePercentage(
      data.promotedLikeCount,
      compareTo.promotedLikeCount
    ),
    organicLikes: calculatePercentage(
      data.organicLikes,
      compareTo.organicLikes
    ),
    avgOrganicLikes: calculatePercentage(
      data.avgOrganicLikes,
      compareTo.avgOrganicLikes
    ),
    organicRetweets: calculatePercentage(
      data.organicRetweets,
      compareTo.organicRetweets
    ),
    avgOrganicRetweets: calculatePercentage(
      data.avgOrganicRetweets,
      compareTo.avgOrganicRetweets
    ),
    promotedImpressions: calculatePercentage(
      data.avgImpressions,
      compareTo.avgImpressions
    ),
    promotedEngagements: calculatePercentage(
      data.promotedEngagements,
      compareTo.promotedEngagements
    ),
    promotedRetweetCount: calculatePercentage(
      data.promotedRetweetCount,
      compareTo.promotedRetweetCount
    ),
    avgCount: calculatePercentage(data.avgCount, compareTo.avgCount),
    avgEngagements: calculatePercentage(
      data.avgEngagements,
      compareTo.avgEngagements
    ),
    avgImpressions: calculatePercentage(
      data.avgImpressions,
      compareTo.avgImpressions
    ),
    avgQuoteCount: calculatePercentage(
      data.avgQuoteCount,
      compareTo.avgQuoteCount
    ),
    avgRetweetCount: calculatePercentage(
      data.avgRetweetCount,
      compareTo.avgRetweetCount
    ),
    avgReplyCount: calculatePercentage(
      data.avgReplyCount,
      compareTo.avgReplyCount
    ),
    avgLikeCount: calculatePercentage(
      data.avgLikeCount,
      compareTo.avgLikeCount
    ),
    avgPromotedLikeCount: calculatePercentage(
      data.avgPromotedLikeCount,
      compareTo.avgPromotedLikeCount
    ),
    avgPromotedImpressions: calculatePercentage(
      data.avgPromotedImpressions,
      compareTo.avgPromotedImpressions
    ),
    avgPromotedEngagements: calculatePercentage(
      data.avgPromotedEngagements,
      compareTo.avgPromotedEngagements
    ),
    avgPromotedRetweets: calculatePercentage(
      data.avgPromotedRetweets,
      compareTo.avgPromotedRetweets
    ),
  };
  console.log(result);
  return result;
}
