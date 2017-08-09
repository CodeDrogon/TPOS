import {Email} from "./email";
import {Phone} from "./phone";
import {Address} from "./address";
import {KYCDocument} from "./kycdocument";
export class Account {
  private AccountId;
  private SourcePkId;
  private ContactId;
  private AccountStatus;
  private RevenueCategory;
  private UserType;
  private CustomerStatus;
  private SourceOfEntry;
  private ParentId;
  private AccountType;
  private IsNotificationsEnabled;
  private FirstName;
  private MiddleName;
  private LastName;
  private Gender;
  private Title;
  private Suffix;
  private NameType;
  private InitiatedBy;
  private UserName;
  private Password;
  private RetypePassword;
  private AddressType;
  private Line1;
  private Line2;
  private Line3;
  private City;
  private State;
  private Country;
  private Zip1;
  private Zip2;
  private IsCommunication;
  private Pin;
  private CurrentPasswordExpiryDate;
  private Address;
  private OrganizationName;
  private WebType;
  private SubSystem;
  private ActivitySource;
  private IsSplitCustomer;
  private boolActivityRequired;
  private convertToCustomer;
  private UserId;
  private ActionCode;
  private FeaturesCode;
  private LoginId;
  private KeyValue;
  private User;
  private ActivityTypeDescription;
  private CheckBlockList;
  private KYCStatus;
  private KYCDate;
  private KYCRequired;
  private LoginStatus;
  private UnPaidAmount;
  private PlanCode;
  private PlanDescription;
  private ParentPlanId;
  private ParentPlanCode;
  private ParentPlanDescription;
  private EnrollmentNumber;
  private IsRegistered;
  private PreloadedAccountId;
  private DOB;
  private IsCreateAccount;
  private IsPrimary;
  private EmailList:Email[];
  private PhoneList:Phone[];
  private AddressList:Address[];
  private Email:{};
  private AddKYCDocument:KYCDocument[];

  get addKYCDocument(): KYCDocument[] {
    return this.AddKYCDocument;
  }

  set addKYCDocument(value: KYCDocument[]) {
    this.AddKYCDocument = value;
  }

  get emailList(): Email[] {
    return this.EmailList;
  }

  set emailList(value: Email[]) {
    this.EmailList = value;
  }

  get phoneList(): Phone[] {
    return this.PhoneList;
  }

  set phoneList(value: Phone[]) {
    this.PhoneList = value;
  }

  get addressList(): Address[] {
    return this.AddressList;
  }

  set addressList(value: Address[]) {
    this.AddressList = value;
  }


  get email(): {} {
    return this.Email;
  }

  set email(value: {}) {
    this.Email = value;
  }

  get accountId() {
    return this.AccountId;
  }

  set accountId(value) {
    this.AccountId = value;
  }

  get sourcePkId() {
    return this.SourcePkId;
  }

  set sourcePkId(value) {
    this.SourcePkId = value;
  }

  get contactId() {
    return this.ContactId;
  }

  set contactId(value) {
    this.ContactId = value;
  }

  get accountStatus() {
    return this.AccountStatus;
  }

  set accountStatus(value) {
    this.AccountStatus = value;
  }

  get revenueCategory() {
    return this.RevenueCategory;
  }

  set revenueCategory(value) {
    this.RevenueCategory = value;
  }

  get userType() {
    return this.UserType;
  }

  set userType(value) {
    this.UserType = value;
  }

  get customerStatus() {
    return this.CustomerStatus;
  }

  set customerStatus(value) {
    this.CustomerStatus = value;
  }

  get sourceOfEntry() {
    return this.SourceOfEntry;
  }

  set sourceOfEntry(value) {
    this.SourceOfEntry = value;
  }

  get parentId() {
    return this.ParentId;
  }

  set parentId(value) {
    this.ParentId = value;
  }

  get accountType() {
    return this.AccountType;
  }

  set accountType(value) {
    this.AccountType = value;
  }

  get isNotificationsEnabled() {
    return this.IsNotificationsEnabled;
  }

  set isNotificationsEnabled(value) {
    this.IsNotificationsEnabled = value;
  }

  get firstName() {
    return this.FirstName;
  }

  set firstName(value) {
    this.FirstName = value;
  }

  get middleName() {
    return this.MiddleName;
  }

  set middleName(value) {
    this.MiddleName = value;
  }

  get lastName() {
    return this.LastName;
  }

  set lastName(value) {
    this.LastName = value;
  }

  get gender() {
    return this.Gender;
  }

  set gender(value) {
    this.Gender = value;
  }

  get title() {
    return this.Title;
  }

  set title(value) {
    this.Title = value;
  }

  get suffix() {
    return this.Suffix;
  }

  set suffix(value) {
    this.Suffix = value;
  }

  get nameType() {
    return this.NameType;
  }

  set nameType(value) {
    this.NameType = value;
  }

  get initiatedBy() {
    return this.InitiatedBy;
  }

  set initiatedBy(value) {
    this.InitiatedBy = value;
  }

  get userName() {
    return this.UserName;
  }

  set userName(value) {
    this.UserName = value;
  }

  get password() {
    return this.Password;
  }

  set password(value) {
    this.Password = value;
  }

  get retypePassword() {
    return this.RetypePassword;
  }

  set retypePassword(value) {
    this.RetypePassword = value;
  }

  get addressType() {
    return this.AddressType;
  }

  set addressType(value) {
    this.AddressType = value;
  }

  get line1() {
    return this.Line1;
  }

  set line1(value) {
    this.Line1 = value;
  }

  get line2() {
    return this.Line2;
  }

  set line2(value) {
    this.Line2 = value;
  }

  get line3() {
    return this.Line3;
  }

  set line3(value) {
    this.Line3 = value;
  }

  get city() {
    return this.City;
  }

  set city(value) {
    this.City = value;
  }

  get state() {
    return this.State;
  }

  set state(value) {
    this.State = value;
  }

  get country() {
    return this.Country;
  }

  set country(value) {
    this.Country = value;
  }

  get zip1() {
    return this.Zip1;
  }

  set zip1(value) {
    this.Zip1 = value;
  }

  get zip2() {
    return this.Zip2;
  }

  set zip2(value) {
    this.Zip2 = value;
  }

  get isCommunication() {
    return this.IsCommunication;
  }

  set isCommunication(value) {
    this.IsCommunication = value;
  }

  get pin() {
    return this.Pin;
  }

  set pin(value) {
    this.Pin = value;
  }

  get currentPasswordExpiryDate() {
    return this.CurrentPasswordExpiryDate;
  }

  set currentPasswordExpiryDate(value) {
    this.CurrentPasswordExpiryDate = value;
  }

  get address() {
    return this.Address;
  }

  set address(value) {
    this.Address = value;
  }

  get organizationName() {
    return this.OrganizationName;
  }

  set organizationName(value) {
    this.OrganizationName = value;
  }

  get webType() {
    return this.WebType;
  }

  set webType(value) {
    this.WebType = value;
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

  get isSplitCustomer() {
    return this.IsSplitCustomer;
  }

  set isSplitCustomer(value) {
    this.IsSplitCustomer = value;
  }

  get BoolActivityRequired() {
    return this.boolActivityRequired;
  }

  set BoolActivityRequired(value) {
    this.boolActivityRequired = value;
  }

  get ConvertToCustomer() {
    return this.convertToCustomer;
  }

  set ConvertToCustomer(value) {
    this.convertToCustomer = value;
  }

  get userId() {
    return this.UserId;
  }

  set userId(value) {
    this.UserId = value;
  }

  get actionCode() {
    return this.ActionCode;
  }

  set actionCode(value) {
    this.ActionCode = value;
  }

  get featuresCode() {
    return this.FeaturesCode;
  }

  set featuresCode(value) {
    this.FeaturesCode = value;
  }

  get loginId() {
    return this.LoginId;
  }

  set loginId(value) {
    this.LoginId = value;
  }

  get keyValue() {
    return this.KeyValue;
  }

  set keyValue(value) {
    this.KeyValue = value;
  }

  get user() {
    return this.User;
  }

  set user(value) {
    this.User = value;
  }

  get activityTypeDescription() {
    return this.ActivityTypeDescription;
  }

  set activityTypeDescription(value) {
    this.ActivityTypeDescription = value;
  }

  get checkBlockList() {
    return this.CheckBlockList;
  }

  set checkBlockList(value) {
    this.CheckBlockList = value;
  }

  get kYCStatus() {
    return this.KYCStatus;
  }

  set kYCStatus(value) {
    this.KYCStatus = value;
  }

  get kYCDate() {
    return this.KYCDate;
  }

  set kYCDate(value) {
    this.KYCDate = value;
  }

  get kYCRequired() {
    return this.KYCRequired;
  }

  set kYCRequired(value) {
    this.KYCRequired = value;
  }


  get loginStatus() {
    return this.LoginStatus;
  }

  set loginStatus(value) {
    this.LoginStatus = value;
  }

  get unPaidAmount() {
    return this.UnPaidAmount;
  }

  set unPaidAmount(value) {
    this.UnPaidAmount = value;
  }

  get planCode() {
    return this.PlanCode;
  }

  set planCode(value) {
    this.PlanCode = value;
  }

  get planDescription() {
    return this.PlanDescription;
  }

  set planDescription(value) {
    this.PlanDescription = value;
  }

  get parentPlanId() {
    return this.ParentPlanId;
  }

  set parentPlanId(value) {
    this.ParentPlanId = value;
  }

  get parentPlanCode() {
    return this.ParentPlanCode;
  }

  set parentPlanCode(value) {
    this.ParentPlanCode = value;
  }

  get parentPlanDescription() {
    return this.ParentPlanDescription;
  }

  set parentPlanDescription(value) {
    this.ParentPlanDescription = value;
  }

  get enrollmentNumber() {
    return this.EnrollmentNumber;
  }

  set enrollmentNumber(value) {
    this.EnrollmentNumber = value;
  }

  get isRegistered() {
    return this.IsRegistered;
  }

  set isRegistered(value) {
    this.IsRegistered = value;
  }

  get preloadedAccountId() {
    return this.PreloadedAccountId;
  }

  set preloadedAccountId(value) {
    this.PreloadedAccountId = value;
  }

  get dOB() {
    return this.DOB;
  }

  set dOB(value) {
    this.DOB = value;
  }

  get isCreateAccount() {
    return this.IsCreateAccount;
  }

  set isCreateAccount(value) {
    this.IsCreateAccount = value;
  }

  get isPrimary() {
    return this.IsPrimary;
  }

  set isPrimary(value) {
    this.IsPrimary = value;
  }






}

