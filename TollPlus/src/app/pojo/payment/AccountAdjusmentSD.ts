export class AccountAdjusmentSD {

  private AccStatusCode;
  private ActivitySource;
  private ActivityType;
  private AdjustmentCategory;
  private AdjustmentCategoryId;
  private AdjustmentDate;
  private AdjustmentLevelId;


  get accStatusCode(): string {
    return this.AccStatusCode;
  }

  set accStatusCode(value: string) {
    this.AccStatusCode = value;
  }

  get activitySource(): string {
    return this.ActivitySource;
  }

  set activitySource(value: string) {
    this.ActivitySource = value;
  }

  get activityType(): string {
    return this.ActivityType;
  }

  set activityType(value: string) {
    this.ActivityType = value;
  }

  get adjustmentCategory(): string {
    return this.AdjustmentCategory;
  }

  set adjustmentCategory(value: string) {
    this.AdjustmentCategory = value;
  }

  get adjustmentCategoryId(): string {
    return this.AdjustmentCategoryId;
  }

  set adjustmentCategoryId(value: string) {
    this.AdjustmentCategoryId = value;
  }

  get adjustmentDate(): string {
    return this.AdjustmentDate;
  }

  set adjustmentDate(value: string) {
    this.AdjustmentDate = value;
  }

  get adjustmentLevelId(): string {
    return this.AdjustmentLevelId;
  }

  set adjustmentLevelId(value: string) {
    this.AdjustmentLevelId = value;
  }
}
