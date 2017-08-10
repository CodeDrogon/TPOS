export class Email {

  private EmailId;
  private CustomerId;
  private EmailAddress;
  private IsPreferred;
  private Type;
  private UserName;
  private IsActive;
  private Paging:{};
  private SubSystem;
  private ActivitySource;
  private IsActivityRequired ;
  private UserId;
  private LoginId;
  private CheckBlockList;
  private IsValid;

  set emailId(value) {
    this.EmailId = value;
  }

  set customerId(value) {
    this.CustomerId = value;
  }

  set emailAddress(value) {
    this.EmailAddress = value;
  }

  set isPreferred(value) {
    this.IsPreferred = value;
  }

  set type(value) {
    this.Type = value;
  }

  set userName(value) {
    this.UserName = value;
  }

  set isActive(value) {
    this.IsActive = value;
  }

  set paging(value: {}) {
    this.Paging = value;
  }

  set subSystem(value) {
    this.SubSystem = value;
  }

  set activitySource(value) {
    this.ActivitySource = value;
  }

  set isActivityRequired(value) {
    this.IsActivityRequired = value;
  }

  set userId(value) {
    this.UserId = value;
  }

  set loginId(value) {
    this.LoginId = value;
  }

  set checkBlockList(value) {
    this.CheckBlockList = value;
  }

  set isValid(value) {
    this.IsValid = value;
  }

  get emailId() {
    return this.EmailId;
  }

  get customerId() {
    return this.CustomerId;
  }

  get emailAddress() {
    return this.EmailAddress;
  }

  get isPreferred() {
    return this.IsPreferred;
  }

  get type() {
    return this.Type;
  }

  get userName() {
    return this.UserName;
  }

  get isActive() {
    return this.IsActive;
  }

  get paging(): {} {
    return this.Paging;
  }

  get subSystem() {
    return this.SubSystem;
  }

  get activitySource() {
    return this.ActivitySource;
  }

  get isActivityRequired() {
    return this.IsActivityRequired;
  }

  get userId() {
    return this.UserId;
  }

  get loginId() {
    return this.LoginId;
  }

  get checkBlockList() {
    return this.CheckBlockList;
  }

  get isValid() {
    return this.IsValid;
  }
}
