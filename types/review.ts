/*
-----------------------------------------
Review Item Type
-----------------------------------------
*/

export interface ReviewItem {

  // Review Table Fields
  id: string;

  status: string;

  analyst_notes: string;

  reviewed_by: string;

  reviewed_at: string | null;

  created_at?: string;

  updated_at?: string;

  /*
  -----------------------------------------
  Normalized Record ID
  -----------------------------------------
  */
  normalized_record: string;

  /*
  -----------------------------------------
  Nested Data From Serializer
  -----------------------------------------
  */

  activity_type: string;

  quantity: number;

  normalized_unit: string;

  scope: string;
}

/*
-----------------------------------------
Paginated API Response
-----------------------------------------
*/

export interface PaginatedReviews {

  count: number;

  next: string | null;

  previous: string | null;

  results: ReviewItem[];
}