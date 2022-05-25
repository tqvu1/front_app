declare namespace SearchParams {
  export interface BaseSearch {
    per?: number;
    limit?: number;
    page?: number;
  }

  export interface NotificationSetting extends BaseSearch {
    publish_date_from?: string;
    publish_date_to?: string;
    title?: string;
    display_condition?: string;
    display_order?: string;
  }

  export interface InternalPIC extends BaseSearch {
    search?: string;
  }
}
