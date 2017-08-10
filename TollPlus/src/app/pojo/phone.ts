export class Phone {
  private PhoneId;
  private CustomerId;
  private Type;
  private PhoneNumber;
  private IsCommunication;
  private Extension;
  private UserName;
  private IsActive;
  private Paging:{};
  private SubSystem;
  private ActivitySource;
  private IsActivityRequired;
  private UserId;
  private LoginId;
  private CheckBlockList;
  private IsPhoneNumberChanged;
  private IsCreateAccount;
  get phoneId() {
    return this.PhoneId;
  }

  set phoneId(value) {
    this.PhoneId = value;
  }

  get customerId() {
    return this.CustomerId;
  }

  set customerId(value) {
    this.CustomerId = value;
  }

  get type() {
    return this.Type;
  }

  set type(value) {
    this.Type = value;
  }

  get phoneNumber() {
    return this.PhoneNumber;
  }

  set phoneNumber(value) {
    this.PhoneNumber = value;
  }

  get isCommunication() {
    return this.IsCommunication;
  }

  set isCommunication(value) {
    this.IsCommunication = value;
  }

  get extension() {
    return this.Extension;
  }

  set extension(value) {
    this.Extension = value;
  }

  get userName() {
    return this.UserName;
  }

  set userName(value) {
    this.UserName = value;
  }

  get isActive() {
    return this.IsActive;
  }

  set isActive(value) {
    this.IsActive = value;
  }

  get paging(): {} {
    return this.Paging;
  }

  set paging(value: {}) {
    this.Paging = value;
  }

  get subSystem() {
    return this.SubSystem;
  }

  set subSystem(value) {
    this.SubSystem = value;
  }

  get activitySource() {
    return this.ActivitySource;
  }

  set activitySource(value) {
    this.ActivitySource = value;
  }

  get isActivityRequired() {
    return this.IsActivityRequired;
  }

  set isActivityRequired(value) {
    this.IsActivityRequired = value;
  }

  get userId() {
    return this.UserId;
  }

  set userId(value) {
    this.UserId = value;
  }

  get loginId() {
    return this.LoginId;
  }

  set loginId(value) {
    this.LoginId = value;
  }

  get checkBlockList() {
    return this.CheckBlockList;
  }

  set checkBlockList(value) {
    this.CheckBlockList = value;
  }

  get isPhoneNumberChanged() {
    return this.IsPhoneNumberChanged;
  }

  set isPhoneNumberChanged(value) {
    this.IsPhoneNumberChanged = value;
  }

  get isCreateAccount() {
    return this.IsCreateAccount;
  }

  set isCreateAccount(value) {
    this.IsCreateAccount = value;
  }


}
