/***** PRINT OBJECT ********/
var SIZE_OF_INDENT = 4;

function printObject(obj, numOfSpaces, keyForObj) {
    numOfSpaces = numOfSpaces || 0;
    
    if(Array.isArray(obj)) {
        if(obj.length) {
            console.log(getSpaces(numOfSpaces) + (keyForObj ? keyForObj + ": " : "") + "[");
            numOfSpaces += SIZE_OF_INDENT;
            for(var i = 0; i < obj.length; i++)
                printObject(obj[i], numOfSpaces);
            numOfSpaces -= SIZE_OF_INDENT;
            console.log(getSpaces(numOfSpaces) + "]");
        } else
            console.log(getSpaces(numOfSpaces) + (keyForObj ? keyForObj + ": " : "") + "[]");
    } else if(typeof obj === "object") {
        if(Object.keys(obj).length) {
            console.log(getSpaces(numOfSpaces) + (keyForObj ? keyForObj + ": " : "") + "{");
            numOfSpaces += SIZE_OF_INDENT;
            var objKeys = Object.keys(obj);
            objKeys.forEach(function(key) {
                printObject(obj[key], numOfSpaces, key);
            });
            numOfSpaces -= SIZE_OF_INDENT;
            console.log(getSpaces(numOfSpaces) + "}");
        } else
            console.log(getSpaces(numOfSpaces) + (keyForObj ? keyForObj + ": " : "") + "{}");
    }
    else
        console.log(getSpaces(numOfSpaces) + (keyForObj ? keyForObj + ": " : "") + (obj === "" ? "(empty string)" : obj));
}

function getSpaces(numOfSpaces) {
    var spaces = "";
    for(var i = 0; i < numOfSpaces; i++)
        spaces += " ";
    
    return spaces;
}
/******** END: PRINT OBJECT ***********/

/***** MESSAGE TEMPS *************/
var messageTemplates = {
    "ABS": [ "dischargeCareProvider", "transferMedicalServiceCode", "severityOfIllnessCode", "dateTimeOfAttestation", "attestedBy", "triageCode", "abstractCompletionDateTime", "abstractedBy", "caseCategoryCode", "caesarianSectionIndicator", "gestationCategoryCode", "gestationPeriodWeeks", "newbornCode", "stillbornIndicator" ],
    "ACC": [ "accidentDateTime", "accidentCode", "accidentLocation", "autoAccidentState", "accidentJobRelatedIndicator", "accidentDeathIndicator", "enteredBy", "accidentDescription", "broughtInBy", "policeNotifiedIndicator", "accidentAddress" ],
    "ADD": [ "addendumContinuationPointer" ],
    "AFF": [ "setIdAff", "professionalOrganization", "professionalOrganizationAddress", "professionalOrganizationAffiliationDateRange", "professionalAffiliationAdditionalInformation" ],
    "AIG": [ "setIdAig", "segmentActionCode", "resourceId", "resourceType", "resourceGroup", "resourceQuantity", "resourceQuantityUnits", "startDateTime", "startDateTimeOffset", "startDateTimeOffsetUnits", "duration", "durationUnits", "allowSubstitutionCode", "fillerStatusCode" ],
    "AIL": [ "setIdAil", "segmentActionCode", "locationResourceId", "locationTypeAil", "locationGroup", "startDateTime", "startDateTimeOffset", "startDateTimeOffsetUnits", "duration", "durationUnits", "allowSubstitutionCode", "fillerStatusCode" ],
    "AIP": [ "setIdAip", "segmentActionCode", "personnelResourceId", "resourceType", "resourceGroup", "startDateTime", "startDateTimeOffset", "startDateTimeOffsetUnits", "duration", "durationUnits", "allowSubstitutionCode", "fillerStatusCode" ],
    "AIS": [ "setIdAis", "segmentActionCode", "universalServiceIdentifier", "startDateTime", "startDateTimeOffset", "startDateTimeOffsetUnits", "duration", "durationUnits", "allowSubstitutionCode", "fillerStatusCode", "placerSupplementalServiceInformation", "fillerSupplementalServiceInformation" ],
    "AL1": [ "setIdAl1", "allergenTypeCode", "allergenCodeMnemonicDescription", "allergySeverityCode", "allergyReactionCode", "identificationDate" ],
    "APR": [ "timeSelectionCriteria", "resourceSelectionCriteria", "locationSelectionCriteria", "slotSpacingCriteria", "fillerOverrideCriteria" ],
    "ARQ": [ "placerAppointmentId", "fillerAppointmentId", "occurrenceNumber", "placerGroupNumber", "scheduleId", "requestEventReason", "appointmentReason", "appointmentType", "appointmentDuration", "appointmentDurationUnits", "requestedStartDateTimeRange", "priorityArq", "repeatingInterval", "repeatingIntervalDuration", "placerContactPerson", "placerContactPhoneNumber", "placerContactAddress", "placerContactLocation", "enteredByPerson", "enteredByPhoneNumber", "enteredByLocation", "parentPlacerAppointmentId", "parentFillerAppointmentId", "placerOrderNumber", "fillerOrderNumber" ],
    "AUT": [ "authorizingPayorPlanId", "authorizingPayorCompanyId", "authorizingPayorCompanyName", "authorizationEffectiveDate", "authorizationExpirationDate", "authorizationIdentifier", "reimbursementLimit", "requestedNumberOfTreatments", "authorizedNumberOfTreatments", "processDate" ],
    "BHS": [ "batchFieldSeparator", "batchEncodingCharacters", "batchSendingApplication", "batchSendingFacility", "batchReceivingApplication", "batchReceivingFacility", "batchCreationDateTime", "batchSecurity", "batchNameIdType", "batchComment", "batchControlId", "referenceBatchControlId" ],
    "BLC": [ "bloodProductCode", "bloodAmount" ],
    "BLG": [ "whenToCharge", "chargeType", "accountId", "chargeTypeReason" ],
    "BPO": [ "setIdBpo", "bpUniversalServiceId", "bpProcessingRequirements", "bpQuantity", "bpAmount", "bpUnits", "bpIntendedUseDateTime", "bpIntendedDispenseFromLocation", "bpIntendedDispenseFromAddress", "bpRequestedDispenseDateTime", "bpRequestedDispenseToLocation", "bpRequestedDispenseToAddress", "bpIndicationForUse", "bpInformedConsentIndicator" ],
    "BPX": [ "setIdBpx", "bpDispenseStatus", "bpStatus", "bpDateTimeOfStatus", "bcDonationId", "bcComponent", "bcDonationTypeIntendedUse", "cpCommercialProduct", "cpManufacturer", "cpLotNumber", "bpBloodGroup", "bcSpecialTesting", "bpExpirationDateTime", "bpQuantity", "bpAmount", "bpUnits", "bpUniqueId", "bpActualDispensedToLocation", "bpActualDispensedToAddress", "bpDispensedToReceiver", "bpDispensingIndividual" ],
    "BTS": [ "batchMessageCount", "batchComment", "batchTotals" ],
    "BTX": [ "setIdBtx", "bcDonationId", "bcComponent", "bcBloodGroup", "cpCommercialProduct", "cpManufacturer", "cpLotNumber", "bpQuantity", "bpAmount", "bpUnits", "bpTransfusionDispositionStatus", "bpMessageStatus", "bpDateTimeOfStatus", "bpAdministrator", "bpVerifier", "bpTransfusionStartDateTimeOfStatus", "bpTransfusionEndDateTimeOfStatus", "bpAdverseReactionType", "bpTransfusionInterruptedReason" ],
    "CDM": [ "primaryKeyValueCdm", "chargeCodeAlias", "chargeDescriptionShort", "chargeDescriptionLong", "descriptionOverrideIndicator", "explodingCharges", "procedureCode", "activeInactiveFlag", "inventoryNumber", "resourceLoad", "contractNumber", "contractOrganization", "roomFeeIndicator" ],
    "CER": [ "setIdCer", "serialNumber", "version", "grantingAuthority", "issuingAuthority", "signatureOfIssuingAuthority", "grantingCountry", "grantingStateProvince", "grantingCountyParish", "certificateType", "certificateDomain", "subjectId", "subjectName", "subjectDirectoryAttributeExtension", "subjectPublicKeyInfo", "authorityKeyIdentifier", "basicConstraint", "crlDistributionPoint", "jurisdictionCountry", "jurisdictionStateProvince", "jurisdictionCountyParish", "jurisdictionBreadth", "grantingDate", "issuingDate", "activationDate", "inactivationDate", "expirationDate", "renewalDate", "revocationDate", "revocationReasonCode", "certificateStatus" ],
    "CM0": [ "setIdCm0", "sponsorStudyId", "alternateStudyId", "titleOfStudy", "chairmanOfStudy", "lastIrbApprovalDate", "totalAccrualToDate", "lastAccrualDate", "contactForStudy", "contactsTelephoneNumber", "contactsAddress" ],
    "CM1": [ "setIdCm1", "studyPhaseIdentifier", "descriptionOfStudyPhase" ],
    "CM2": [ "setIdCm2", "scheduledTimePoint", "descriptionOfTimePoint", "eventsScheduledThisTimePoint" ],
    "CNS": [ "startingNotificationReferenceNumber", "endingNotificationReferenceNumber", "startingNotificationDateTime", "endingNotificationDateTime", "startingNotificationCode", "endingNotificationCode" ],
    "CON": [ "setIdCon", "consentType", "consentFormId", "consentFormNumber", "consentText", "subjectSpecificConsentText", "consentBackground", "subjectSpecificConsentBackground", "consenterImposedLimitations", "consentMode", "consentStatus", "consentDiscussionDateTime", "consentDecisionDateTime", "consentEffectiveDateTime", "consentEndDateTime", "subjectCompetenceIndicator", "translatorAssistanceIndicator", "languageTranslatedTo", "informationalMaterialSuppliedIndicator", "consentBypassReason", "consentDisclosureLevel", "consentNonDisclosureReason", "nonSubjectConsenterReason", "consenterId", "relationshipToSubjectTable" ],
    "CSP": [ "studyPhaseIdentifier", "dateTimeStudyPhaseBegan", "dateTimeStudyPhaseEnded", "studyPhaseEvaluability" ],
    "CSR": [ "sponsorStudyId", "alternateStudyId", "institutionRegisteringThePatient", "sponsorPatientId", "alternatePatientIdCsr", "dateTimeOfPatientStudyRegistration", "personPerformingStudyRegistration", "studyAuthorizingProvider", "dateTimePatientStudyConsentSigned", "patientStudyEligibilityStatus", "studyRandomizationDateTime", "randomizedStudyArm", "stratumForStudyRandomization", "patientEvaluabilityStatus", "dateTimeEndedStudy", "reasonEndedStudy" ],
    "CSS": [ "studyScheduledTimePoint", "studyScheduledPatientTimePoint", "studyQualityControlCodes" ],
    "CTD": [ "contactRole", "contactName", "contactAddress", "contactLocation", "contactCommunicationInformation", "preferredMethodOfContact", "contactIdentifiers" ],
    "CTI": [ "sponsorStudyId", "studyPhaseIdentifier", "studyScheduledTimePoint" ],
    "DB1": [ "setIdDb1", "disabledPersonCode", "disabledPersonIdentifier", "disabledIndicator", "disabilityStartDate", "disabilityEndDate", "disabilityReturnToWorkDate", "disabilityUnableToWorkDate" ],
    "DG1": [ "setIdDg1", "diagnosisCodingMethod", "diagnosisCodeDg1", "diagnosisDescription", "diagnosisDateTime", "diagnosisType", "majorDiagnosticCategory", "diagnosticRelatedGroup", "drgApprovalIndicator", "drgGrouperReviewCode", "outlierType", "outlierDays", "outlierCost", "grouperVersionAndType", "diagnosisPriority", "diagnosingClinician", "diagnosisClassification", "confidentialIndicator", "attestationDateTime", "diagnosisIdentifier", "diagnosisActionCode" ],
    "DRG": [ "diagnosticRelatedGroup", "drgAssignedDateTime", "drgApprovalIndicator", "drgGrouperReviewCode", "outlierType", "outlierDays", "outlierCost", "drgPayor", "outlierReimbursement", "confidentialIndicator", "drgTransferType" ],
    "DSC": [ "continuationPointer", "continuationStyle" ],
    "DSP": [ "setIdDsp", "displayLevel", "dataLine", "logicalBreakPoint", "resultId" ],
    "ECD": [ "referenceCommandNumber", "remoteControlCommand", "responseRequired", "requestedCompletionTime", "parameters" ],
    "ECR": [ "commandResponse", "dateTimeCompleted", "commandResponseParameters" ],
    "EDU": [ "setIdEdu", "academicDegree", "academicDegreeProgramDateRange", "academicDegreeProgramParticipationDateRange", "academicDegreeGrantedDate", "school", "schoolTypeCode", "schoolAddress", "majorFieldOfStudy" ],
    "EQL": [ "queryTag", "queryResponseFormatCode", "eqlQueryName", "eqlQueryStatement" ],
    "EQP": [ "eventType", "fileName", "startDateTime", "endDateTime", "transactionData" ],
    "EQU": [ "equipmentInstanceIdentifier", "eventDateTime", "equipmentState", "localRemoteControlState", "alertLevel" ],
    "ERQ": [ "queryTag", "eventIdentifier", "inputParameterList" ],
    "ERR": [ "errorCodeAndLocation", "errorLocation", "hl7ErrorCode", "severity", "applicationErrorCode", "applicationErrorParameter", "diagnosticInformation", "userMessage", "informPersonIndicator", "overrideType", "overrideReasonCode", "helpDeskContactPoint" ],
    "EVN": [ "eventTypeCode", "recordedDateTime", "dateTimePlannedEvent", "eventReasonCode", "operatorId", "eventOccurred", "eventFacility" ],
    "FAC": [ "facilityIdFac", "facilityType", "facilityAddress", "facilityTelecommunication", "contactPerson", "contactTitle", "contactAddress", "contactTelecommunication", "signatureAuthority", "signatureAuthorityTitle", "signatureAuthorityAddress", "signatureAuthorityTelecommunication" ],
    "FHS": [ "fileFieldSeparator", "fileEncodingCharacters", "fileSendingApplication", "fileSendingFacility", "fileReceivingApplication", "fileReceivingFacility", "fileCreationDateTime", "fileSecurity", "fileNameId", "fileHeaderComment", "fileControlId", "referenceFileControlId" ],
    "FT1": [ "setIdFt1", "transactionId", "transactionBatchId", "transactionDate", "transactionPostingDate", "transactionType", "transactionCode", "transactionDescription", "transactionDescriptionAlt", "transactionQuantity", "transactionAmountExtended", "transactionAmountUnit", "departmentCode", "insurancePlanId", "insuranceAmount", "assignedPatientLocation", "feeSchedule", "patientType", "diagnosisCodeFt1", "performedByCode", "orderedByCode", "unitCost", "fillerOrderNumber", "enteredByCode", "procedureCode", "procedureCodeModifier", "advancedBeneficiaryNoticeCode", "medicallyNecessaryDuplicateProcedureReason", "ndcCode", "paymentReferenceId", "transactionReferenceKey" ],
    "FTS": [ "fileBatchCount", "fileTrailerComment" ],
    "GOL": [ "actionCode", "actionDateTime", "goalId", "goalInstanceId", "episodeOfCareId", "goalListPriority", "goalEstablishedDateTime", "expectedGoalAchieveDateTime", "goalClassification", "goalManagementDiscipline", "currentGoalReviewStatus", "currentGoalReviewDateTime", "nextGoalReviewDateTime", "previousGoalReviewDateTime", "goalReviewInterval", "goalEvaluation", "goalEvaluationComment", "goalLifeCycleStatus", "goalLifeCycleStatusDateTime", "goalTargetType", "goalTargetName" ],
    "GP1": [ "typeOfBillCode", "revenueCode", "overallClaimDispositionCode", "oceEditsPerVisitCode", "outlierCost" ],
    "GP2": [ "revenueCode", "numberOfServiceUnits", "charge", "reimbursementActionCode", "denialOrRejectionCode", "oceEditCode", "ambulatoryPaymentClassificationCode", "modifierEditCode", "paymentAdjustmentCode", "packagingStatusCode", "expectedCmsPaymentAmount", "reimbursementTypeCode", "coPayAmount", "payRatePerServiceUnit" ],
    "GT1": [ "setIdGt1", "guarantorNumber", "guarantorName", "guarantorSpouseName", "guarantorAddress", "guarantorPhNumHome", "guarantorPhNumBusiness", "guarantorDateTimeOfBirth", "guarantorAdministrativeSex", "guarantorType", "guarantorRelationship", "guarantorSsn", "guarantorDateBegin", "guarantorDateEnd", "guarantorPriority", "guarantorEmployerName", "guarantorEmployerAddress", "guarantorEmployerPhoneNumber", "guarantorEmployeeIdNumber", "guarantorEmploymentStatus", "guarantorOrganizationName", "guarantorBillingHoldFlag", "guarantorCreditRatingCode", "guarantorDeathDateAndTime", "guarantorDeathFlag", "guarantorChargeAdjustmentCode", "guarantorHouseholdAnnualIncome", "guarantorHouseholdSize", "guarantorEmployerIdNumber", "guarantorMaritalStatusCode", "guarantorHireEffectiveDate", "employmentStopDate", "livingDependency", "ambulatoryStatus", "citizenship", "primaryLanguage", "livingArrangement", "publicityCode", "protectionIndicator", "studentIndicator", "religion", "mothersMaidenName", "nationality", "ethnicGroup", "contactPersonsName", "contactPersonsTelephoneNumber", "contactReason", "contactRelationship", "jobTitle", "jobCodeClass", "guarantorEmployersOrganizationName", "handicap", "jobStatus", "guarantorFinancialClass", "guarantorRace", "guarantorBirthPlace", "vipIndicator" ],
    "IAM": [ "setIdIam", "allergenTypeCode", "allergenCodeMnemonicDescription", "allergySeverityCode", "allergyReactionCode", "allergyActionCode", "allergyUniqueIdentifier", "actionReason", "sensitivityToCausativeAgentCode", "allergenGroupCodeMnemonicDescription", "onsetDate", "onsetDateText", "reportedDateTime", "reportedBy", "relationshipToPatientCode", "alertDeviceCode", "allergyClinicalStatusCode", "statusedByPerson", "statusedByOrganization", "statusedAtDateTime" ],
    "IIM": [ "primaryKeyValueIim", "serviceItemCode", "inventoryLotNumber", "inventoryExpirationDate", "inventoryManufacturerName", "inventoryLocation", "inventoryReceivedDate", "inventoryReceivedQuantity", "inventoryReceivedQuantityUnit", "inventoryReceivedItemCost", "inventoryOnHandDate", "inventoryOnHandQuantity", "inventoryOnHandQuantityUnit", "procedureCode", "procedureCodeModifier" ],
    "IN1": [ "setIdIn1", "insurancePlanId", "insuranceCompanyId", "insuranceCompanyName", "insuranceCompanyAddress", "insuranceCoContactPerson", "insuranceCoPhoneNumber", "groupNumber", "groupName", "insuredsGroupEmpId", "insuredsGroupEmpName", "planEffectiveDate", "planExpirationDate", "authorizationInformation", "planType", "nameOfInsured", "insuredsRelationshipToPatient", "insuredsDateOfBirth", "insuredsAddress", "assignmentOfBenefits", "coordinationOfBenefits", "coordOfBenPriority", "noticeOfAdmissionFlag", "noticeOfAdmissionDate", "reportOfEligibilityFlag", "reportOfEligibilityDate", "releaseInformationCode", "preAdmitCert", "verificationDateTime", "verificationBy", "typeOfAgreementCode", "billingStatus", "lifetimeReserveDays", "delayBeforeLRDay", "companyPlanCode", "policyNumber", "policyDeductible", "policyLimitAmount", "policyLimitDays", "roomRateSemiPrivate", "roomRatePrivate", "insuredsEmploymentStatus", "insuredsAdministrativeSex", "insuredsEmployersAddress", "verificationStatus", "priorInsurancePlanId", "coverageType", "handicap", "insuredsIdNumber", "signatureCode", "signatureCodeDate", "insuredSBirthPlace", "vipIndicator" ],
    "IN2": [ "insuredsEmployeeId", "insuredsSocialSecurityNumber", "insuredsEmployersNameAndId", "employerInformationData", "mailClaimParty", "medicareHealthInsCardNumber", "medicaidCaseName", "medicaidCaseNumber", "militarySponsorName", "militaryIdNumber", "dependentOfMilitaryRecipient", "militaryOrganization", "militaryStation", "militaryService", "militaryRankGrade", "militaryStatus", "militaryRetireDate", "militaryNonAvailCertOnFile", "babyCoverage", "combineBabyBill", "bloodDeductible", "specialCoverageApprovalName", "specialCoverageApprovalTitle", "nonCoveredInsuranceCode", "payorId", "payorSubscriberId", "eligibilitySource", "roomCoverageTypeAmount", "policyTypeAmount", "dailyDeductible", "livingDependency", "ambulatoryStatus", "citizenship", "primaryLanguage", "livingArrangement", "publicityCode", "protectionIndicator", "studentIndicator", "religion", "mothersMaidenName", "nationality", "ethnicGroup", "maritalStatus", "insuredsEmploymentStartDate", "employmentStopDate", "jobTitle", "jobCodeClass", "jobStatus", "employerContactPersonName", "employerContactPersonPhoneNumber", "employerContactReason", "insuredsContactPersonsName", "insuredsContactPersonPhoneNumber", "insuredsContactPersonReason", "relationshipToThePatientStartDate", "relationshipToThePatientStopDate", "insuranceCoContactReason", "insuranceCoContactPhoneNumber", "policyScope", "policySource", "patientMemberNumber", "guarantorsRelationshipToInsured", "insuredsPhoneNumberHome", "insuredsEmployerPhoneNumber", "militaryHandicappedProgram", "suspendFlag", "copayLimitFlag", "stoplossLimitFlag", "insuredOrganizationNameAndId", "insuredEmployerOrganizationNameAndId", "race", "cmsPatientSRelationshipToInsured" ],
    "IN3": [ "setIdIn3", "certificationNumber", "certifiedBy", "certificationRequired", "penalty", "certificationDateTime", "certificationModifyDateTime", "operator", "certificationBeginDate", "certificationEndDate", "days", "nonConcurCodeDescription", "nonConcurEffectiveDateTime", "physicianReviewer", "certificationContact", "certificationContactPhoneNumber", "appealReason", "certificationAgency", "certificationAgencyPhoneNumber", "preCertificationRequirement", "caseManager", "secondOpinionDate", "secondOpinionStatus", "secondOpinionDocumentationReceived", "secondOpinionPhysician" ],
    "INV": [ "substanceIdentifier", "substanceStatus", "substanceType", "inventoryContainerIdentifier", "containerCarrierIdentifier", "positionOnCarrier", "initialQuantity", "currentQuantity", "availableQuantity", "consumptionQuantity", "quantityUnits", "expirationDateTime", "firstUsedDateTime", "onBoardStabilityDuration", "testFluidIdentifier", "manufacturerLotNumber", "manufacturerIdentifier", "supplierIdentifier", "onBoardStabilityTime", "targetValue" ],
    "IPC": [ "accessionIdentifier", "requestedProcedureId", "studyInstanceUid", "scheduledProcedureStepId", "modality", "protocolCode", "scheduledStationName", "scheduledProcedureStepLocation", "scheduledAeTitle" ],
    "ISD": [ "referenceInteractionNumber", "interactionTypeIdentifier", "interactionActiveState" ],
    "LAN": [ "setIdLan", "languageCode", "languageAbilityCode", "languageProficiencyCode" ],
    "LCC": [ "primaryKeyValueLcc", "locationDepartment", "accommodationType", "chargeCode" ],
    "LCH": [ "primaryKeyValueLch", "segmentActionCode", "segmentUniqueKey", "locationCharacteristicId", "locationCharacteristicValueLch" ],
    "LDP": [ "primaryKeyValueLdp", "locationDepartment", "locationService", "specialtyType", "validPatientClasses", "activeInactiveFlag", "activationDateLdp", "inactivationDateLdp", "inactivatedReason", "visitingHours", "contactPhone", "locationCostCenter" ],
    "LOC": [ "primaryKeyValueLoc", "locationDescription", "locationTypeLoc", "organizationNameLoc", "locationAddress", "locationPhone", "licenseNumber", "locationEquipment", "locationServiceCode" ],
    "LRL": [ "primaryKeyValueLrl", "segmentActionCode", "segmentUniqueKey", "locationRelationshipId", "organizationalLocationRelationshipValue", "patientLocationRelationshipValue" ],
    "MFA": [ "recordLevelEventCode", "mfnControlId", "eventCompletionDateTime", "mfnRecordLevelErrorReturn", "primaryKeyValueMfa", "primaryKeyValueTypeMfa" ],
    "MFE": [ "recordLevelEventCode", "mfnControlId", "effectiveDateTime", "primaryKeyValueMfe", "primaryKeyValueType" ],
    "MFI": [ "masterFileIdentifier", "masterFileApplicationIdentifier", "fileLevelEventCode", "enteredDateTime", "effectiveDateTime", "responseLevelCode" ],
    "MRG": [ "priorPatientIdentifierList", "priorAlternatePatientId", "priorPatientAccountNumber", "priorPatientId", "priorVisitNumber", "priorAlternateVisitId", "priorPatientName" ],
    "MSA": [ "acknowledgmentCode", "messageControlId", "textMessage", "expectedSequenceNumber", "delayedAcknowledgmentType", "errorCondition" ],
    "MSH": [ "fieldSeparator", "encodingCharacters", "sendingApplication", "sendingFacility", "receivingApplication", "receivingFacility", "dateTimeOfMessage", "security", "messageType", "messageControlId", "processingId", "versionId", "sequenceNumber", "continuationPointer", "acceptAcknowledgmentType", "applicationAcknowledgmentType", "countryCode", "characterSet", "principalLanguageOfMessage", "alternateCharacterSetHandlingScheme", "messageProfileIdentifier" ],
    "NCK": [ "systemDateTime" ],
    "NDS": [ "notificationReferenceNumber", "notificationDateTime", "notificationAlertSeverity", "notificationCode" ],
    "NK1": [ "setIdNk1", "name", "relationship", "address", "phoneNumber", "businessPhoneNumber", "contactRole", "startDate", "endDate", "nextOfKinAssociatedPartiesJobTitle", "nextOfKinAssociatedPartiesJobCodeClass", "nextOfKinAssociatedPartiesEmployeeNumber", "organizationNameNk1", "maritalStatus", "administrativeSex", "dateTimeOfBirth", "livingDependency", "ambulatoryStatus", "citizenship", "primaryLanguage", "livingArrangement", "publicityCode", "protectionIndicator", "studentIndicator", "religion", "mothersMaidenName", "nationality", "ethnicGroup", "contactReason", "contactPersonsName", "contactPersonsTelephoneNumber", "contactPersonsAddress", "nextOfKinAssociatedPartysIdentifiers", "jobStatus", "race", "handicap", "contactPersonSocialSecurityNumber", "nextOfKinBirthPlace", "vipIndicator" ],
    "NPU": [ "bedLocation", "bedStatus" ],
    "NSC": [ "applicationChangeType", "currentCpu", "currentFileserver", "currentApplication", "currentFacility", "newCpu", "newFileserver", "newApplication", "newFacility" ],
    "NST": [ "statisticsAvailable", "sourceIdentifier", "sourceType", "statisticsStart", "statisticsEnd", "receiveCharacterCount", "sendCharacterCount", "messagesReceived", "messagesSent", "checksumErrorsReceived", "lengthErrorsReceived", "otherErrorsReceived", "connectTimeouts", "receiveTimeouts", "applicationControlLevelErrors" ],
    "NTE": [ "setIdNte", "sourceOfComment", "comment", "commentType" ],
    "OBR": [ "setIdObr", "placerOrderNumber", "fillerOrderNumber", "universalServiceIdentifier", "priorityObr", "requestedDateTime", "observationDateTime", "observationEndDateTime", "collectionVolume", "collectorIdentifier", "specimenActionCode", "dangerCode", "relevantClinicalInformation", "specimenReceivedDateTime", "specimenSource", "orderingProvider", "orderCallbackPhoneNumber", "placerField1", "placerField2", "fillerField1", "fillerField2", "resultsRptStatusChngDateTime", "chargeToPractice", "diagnosticServSectId", "resultStatus", "parentResult", "quantityTiming", "resultCopiesTo", "parent", "transportationMode", "reasonForStudy", "principalResultInterpreter", "assistantResultInterpreter", "technician", "transcriptionist", "scheduledDateTime", "numberOfSampleContainers", "transportLogisticsOfCollectedSample", "collectorsComment", "transportArrangementResponsibility", "transportArranged", "escortRequired", "plannedPatientTransportComment", "procedureCode", "procedureCodeModifier", "placerSupplementalServiceInformation", "fillerSupplementalServiceInformation", "medicallyNecessaryDuplicateProcedureReason", "resultHandling" ],
    "OBX": [ "setIdObx", "valueType", "observationIdentifier", "observationSubId", "observationValue", "units", "referencesRange", "abnormalFlags", "probability", "natureOfAbnormalTest", "observationResultStatus", "effectiveDateOfReferenceRange", "userDefinedAccessChecks", "dateTimeOfTheObservation", "producersId", "responsibleObserver", "observationMethod", "equipmentInstanceIdentifier", "dateTimeOfTheAnalysis" ],
    "ODS": [ "type", "servicePeriod", "dietSupplementOrPreferenceCode", "textInstruction" ],
    "ODT": [ "trayType", "servicePeriod", "textInstruction" ],
    "OM1": [ "sequenceNumberTestObservationMasterFile", "producersServiceTestObservationId", "permittedDataTypes", "specimenRequired", "producerId", "observationDescription", "otherServiceTestObservationIDsForTheObservation", "otherNames", "preferredReportNameForTheObservation", "preferredShortNameOrMnemonicForObservation", "preferredLongNameForTheObservation", "orderability", "identityOfInstrumentUsedToPerformThisStudy", "codedRepresentationOfMethod", "portableDeviceIndicator", "observationProducingDepartmentSection", "telephoneNumberOfSection", "natureOfServiceTestObservation", "reportSubheader", "reportDisplayOrder", "dateTimeStampForAnyChangeInDefinitionForTheObservation", "effectiveDateTimeOfChange", "typicalTurnAroundTime", "processingTime", "processingPriority", "reportingPriority", "outsideSiteWhereObservationMayBePerformed", "addressOfOutsideSite", "phoneNumberOfOutsideSite", "confidentialityCode", "observationsRequiredToInterpretTheObservation", "interpretationOfObservations", "contraindicationsToObservations", "reflexTestsObservations", "rulesThatTriggerReflexTesting", "fixedCannedMessage", "patientPreparation", "procedureMedication", "factorsThatMayAffectTheObservation", "serviceTestObservationPerformanceSchedule", "descriptionOfTestMethods", "kindOfQuantityObserved", "pointVersusInterval", "challengeInformation", "relationshipModifier", "targetAnatomicSiteOfTest", "modalityOfImagingMeasurement" ],
    "OM2": [ "sequenceNumberTestObservationMasterFile", "unitsOfMeasure", "rangeOfDecimalPrecision", "correspondingSiUnitsOfMeasure", "siConversionFactor", "referenceRangeOrdinalAndContinuousObservations", "criticalRangeForOrdinalAndContinuousObservations", "absoluteRangeForOrdinalAndContinuousObservations", "deltaCheckCriteria", "minimumMeaningfulIncrements" ],
    "OM3": [ "sequenceNumberTestObservationMasterFile", "preferredCodingSystem", "validCodedAnswers", "normalTextCodesForCategoricalObservations", "abnormalTextCodesForCategoricalObservations", "criticalTextCodesForCategoricalObservations", "valueType" ],
    "OM4": [ "sequenceNumberTestObservationMasterFile", "derivedSpecimen", "containerDescription", "containerVolume", "containerUnits", "specimen", "additive", "preparation", "specialHandlingRequirements", "normalCollectionVolume", "minimumCollectionVolume", "specimenRequirements", "specimenPriorities", "specimenRetentionTime" ],
    "OM5": [ "sequenceNumberTestObservationMasterFile", "testObservationsIncludedWithinAnOrderedTestBattery", "observationIdSuffixes" ],
    "OM6": [ "sequenceNumberTestObservationMasterFile", "derivationRule" ],
    "OM7": [ "sequenceNumberTestObservationMasterFile", "universalServiceIdentifier", "categoryIdentifier", "categoryDescription", "categorySynonym", "effectiveTestServiceStartDateTime", "effectiveTestServiceEndDateTime", "testServiceDefaultDurationQuantity", "testServiceDefaultDurationUnits", "testServiceDefaultFrequency", "consentIndicator", "consentIdentifier", "consentEffectiveStartDateTime", "consentEffectiveEndDateTime", "consentIntervalQuantity", "consentIntervalUnits", "consentWaitingPeriodQuantity", "consentWaitingPeriodUnits", "effectiveDateTimeOfChange", "enteredBy", "orderableAtLocation", "formularyStatus", "specialOrderIndicator", "primaryKeyValueCdm" ],
    "ORC": [ "orderControl", "placerOrderNumber", "fillerOrderNumber", "placerGroupNumber", "orderStatus", "responseFlag", "quantityTiming", "parent", "dateTimeOfTransaction", "enteredBy", "verifiedBy", "orderingProvider", "enterersLocation", "callBackPhoneNumber", "orderEffectiveDateTime", "orderControlCodeReason", "enteringOrganization", "enteringDevice", "actionBy", "advancedBeneficiaryNoticeCode", "orderingFacilityName", "orderingFacilityAddress", "orderingFacilityPhoneNumber", "orderingProviderAddress", "orderStatusModifier", "advancedBeneficiaryNoticeOverrideReason", "fillersExpectedAvailabilityDateTime", "confidentialityCode", "orderType", "entererAuthorizationMode" ],
    "ORG": [ "setIdOrg", "organizationUnitCode", "organizationUnitTypeCode", "primaryOrgUnitIndicator", "practitionerOrgUnitIdentifier", "healthCareProviderTypeCode", "healthCareProviderClassificationCode", "healthCareProviderAreaOfSpecializationCode", "effectiveDateRange", "employmentStatusCode", "boardApprovalIndicator", "primaryCarePhysicianIndicator" ],
    "OVR": [ "businessRuleOverrideType", "businessRuleOverrideCode", "overrideComments", "overrideEnteredBy", "overrideAuthorizedBy" ],
    "PCR": [ "implicatedProduct", "genericProduct", "productClass", "totalDurationOfTherapy", "productManufactureDate", "productExpirationDate", "productImplantationDate", "productExplantationDate", "singleUseDevice", "indicationForProductUse", "productProblem", "productSerialLotNumber", "productAvailableForInspection", "productEvaluationPerformed", "productEvaluationStatus", "productEvaluationResults", "evaluatedProductSource", "dateProductReturnedToManufacturer", "deviceOperatorQualifications", "relatednessAssessment", "actionTakenInResponseToTheEvent", "eventCausalityObservations", "indirectExposureMechanism" ],
    "PD1": [ "livingDependency", "livingArrangement", "patientPrimaryFacility", "patientPrimaryCareProviderNameIdNo", "studentIndicator", "handicap", "livingWillCode", "organDonorCode", "separateBill", "duplicatePatient", "publicityCode", "protectionIndicator", "protectionIndicatorEffectiveDate", "placeOfWorship", "advanceDirectiveCode", "immunizationRegistryStatus", "immunizationRegistryStatusEffectiveDate", "publicityCodeEffectiveDate", "militaryBranch", "militaryRankGrade", "militaryStatus" ],
    "PDA": [ "deathCauseCode", "deathLocation", "deathCertifiedIndicator", "deathCertificateSignedDateTime", "deathCertifiedBy", "autopsyIndicator", "autopsyStartAndEndDateTime", "autopsyPerformedBy", "coronerIndicator" ],
    "PDC": [ "manufacturerDistributor", "country", "brandName", "deviceFamilyName", "genericName", "modelIdentifier", "catalogueIdentifier", "otherIdentifier", "productCode", "marketingBasis", "marketingApprovalId", "labeledShelfLife", "expectedShelfLife", "dateFirstMarketed", "dateLastMarketed" ],
    "PEO": [ "eventIdentifiersUsed", "eventSymptomDiagnosisCode", "eventOnsetDateTime", "eventExacerbationDateTime", "eventImprovedDateTime", "eventEndedDataTime", "eventLocationOccurredAddress", "eventQualification", "eventSerious", "eventExpected", "eventOutcome", "patientOutcome", "eventDescriptionFromOthers", "eventFromOriginalReporter", "eventDescriptionFromPatient", "eventDescriptionFromPractitioner", "eventDescriptionFromAutopsy", "causeOfDeath", "primaryObserverName", "primaryObserverAddress", "primaryObserverTelephone", "primaryObserversQualification", "confirmationProvidedBy", "primaryObserverAwareDateTime", "primaryObserversIdentityMayBeDivulged" ],
    "PES": [ "senderOrganizationName", "senderIndividualName", "senderAddress", "senderTelephone", "senderEventIdentifier", "senderSequenceNumber", "senderEventDescription", "senderComment", "senderAwareDateTime", "eventReportDate", "eventReportTimingType", "eventReportSource", "eventReportedTo" ],
    "PID": [ "setIdPid", "patientId", "patientIdentifierList", "alternatePatientIdPid", "patientName", "mothersMaidenName", "dateTimeOfBirth", "administrativeSex", "patientAlias", "race", "patientAddress", "countyCode", "phoneNumberHome", "phoneNumberBusiness", "primaryLanguage", "maritalStatus", "religion", "patientAccountNumber", "ssnNumberPatient", "driversLicenseNumberPatient", "mothersIdentifier", "ethnicGroup", "birthPlace", "multipleBirthIndicator", "birthOrder", "citizenship", "veteransMilitaryStatus", "nationality", "patientDeathDateAndTime", "patientDeathIndicator", "identityUnknownIndicator", "identityReliabilityCode", "lastUpdateDateTime", "lastUpdateFacility", "speciesCode", "breedCode", "strain", "productionClassCode", "tribalCitizenship" ],
    "PR1": [ "setIdPr1", "procedureCodingMethod", "procedureCode", "procedureDescription", "procedureDateTime", "procedureFunctionalType", "procedureMinutes", "anesthesiologist", "anesthesiaCode", "anesthesiaMinutes", "surgeon", "procedurePractitioner", "consentCode", "procedurePriority", "associatedDiagnosisCode", "procedureCodeModifier", "procedureDrgType", "tissueTypeCode", "procedureIdentifier", "procedureActionCode" ],
    "PRA": [ "primaryKeyValuePra", "practitionerGroup", "practitionerCategory", "providerBilling", "specialty", "practitionerIdNumbers", "privileges", "dateEnteredPractice", "institution", "dateLeftPractice", "governmentReimbursementBillingEligibility", "setIdPra" ],
    "PRB": [ "actionCode", "actionDateTime", "problemId", "problemInstanceId", "episodeOfCareId", "problemListPriority", "problemEstablishedDateTime", "anticipatedProblemResolutionDateTime", "actualProblemResolutionDateTime", "problemClassification", "problemManagementDiscipline", "problemPersistence", "problemConfirmationStatus", "problemLifeCycleStatus", "problemLifeCycleStatusDateTime", "problemDateOfOnset", "problemOnsetText", "problemRanking", "certaintyOfProblem", "probabilityOfProblem", "individualAwarenessOfProblem", "problemPrognosis", "individualAwarenessOfPrognosis", "familySignificantOtherAwarenessOfProblemPrognosis", "securitySensitivity" ],
    "PRC": [ "primaryKeyValuePrc", "facilityIdPrc", "department", "validPatientClasses", "price", "formula", "minimumQuantity", "maximumQuantity", "minimumPrice", "maximumPrice", "effectiveStartDate", "effectiveEndDate", "priceOverrideFlag", "billingCategory", "chargeableFlag", "activeInactiveFlag", "cost", "chargeOnIndicator" ],
    "PRD": [ "providerRole", "providerName", "providerAddress", "providerLocation", "providerCommunicationInformation", "preferredMethodOfContact", "providerIdentifiers", "effectiveStartDateOfProviderRole", "effectiveEndDateOfProviderRole" ],
    "PSH": [ "reportType", "reportFormIdentifier", "reportDate", "reportIntervalStartDate", "reportIntervalEndDate", "quantityManufactured", "quantityDistributed", "quantityDistributedMethod", "quantityDistributedComment", "quantityInUse", "quantityInUseMethod", "quantityInUseComment", "numberOfProductExperienceReportsFiledByFacility", "numberOfProductExperienceReportsFiledByDistributor" ],
    "PTH": [ "actionCode", "pathwayId", "pathwayInstanceId", "pathwayEstablishedDateTime", "pathwayLifeCycleStatus", "changePathwayLifeCycleStatusDateTime" ],
    "PV1": [ "setIdPv1", "patientClass", "assignedPatientLocation", "admissionType", "preadmitNumber", "priorPatientLocation", "attendingDoctor", "referringDoctor", "consultingDoctor", "hospitalService", "temporaryLocation", "preadmitTestIndicator", "reAdmissionIndicator", "admitSource", "ambulatoryStatus", "vipIndicator", "admittingDoctor", "patientType", "visitNumber", "financialClass", "chargePriceIndicator", "courtesyCode", "creditRating", "contractCode", "contractEffectiveDate", "contractAmount", "contractPeriod", "interestCode", "transferToBadDebtCode", "transferToBadDebtDate", "badDebtAgencyCode", "badDebtTransferAmount", "badDebtRecoveryAmount", "deleteAccountIndicator", "deleteAccountDate", "dischargeDisposition", "dischargedToLocation", "dietType", "servicingFacility", "bedStatus", "accountStatus", "pendingLocation", "priorTemporaryLocation", "admitDateTime", "dischargeDateTime", "currentPatientBalance", "totalCharges", "totalAdjustments", "totalPayments", "alternateVisitId", "visitIndicator", "otherHealthcareProvider" ],
    "PV2": [ "priorPendingLocation", "accommodationCode", "admitReason", "transferReason", "patientValuables", "patientValuablesLocation", "visitUserCode", "expectedAdmitDateTime", "expectedDischargeDateTime", "estimatedLengthOfInpatientStay", "actualLengthOfInpatientStay", "visitDescription", "referralSourceCode", "previousServiceDate", "employmentIllnessRelatedIndicator", "purgeStatusCode", "purgeStatusDate", "specialProgramCode", "retentionIndicator", "expectedNumberOfInsurancePlans", "visitPublicityCode", "visitProtectionIndicator", "clinicOrganizationName", "patientStatusCode", "visitPriorityCode", "previousTreatmentDate", "expectedDischargeDisposition", "signatureOnFileDate", "firstSimilarIllnessDate", "patientChargeAdjustmentCode", "recurringServiceCode", "billingMediaCode", "expectedSurgeryDateAndTime", "militaryPartnershipCode", "militaryNonAvailabilityCode", "newbornBabyIndicator", "babyDetainedIndicator", "modeOfArrivalCode", "recreationalDrugUseCode", "admissionLevelOfCareCode", "precautionCode", "patientConditionCode", "livingWillCode", "organDonorCode", "advanceDirectiveCode", "patientStatusEffectiveDate", "expectedLoaReturnDateTime", "expectedPreAdmissionTestingDateTime", "notifyClergyCode" ],
    "QAK": [ "queryTag", "queryResponseStatus", "messageQueryName", "hitCount", "thisPayload", "hitsRemaining" ],
    "QID": [ "queryTag", "messageQueryName" ],
    "QPD": [ "messageQueryName", "queryTag", "patientId", "whatDomainsReturned" ], //in schemas file, patientId is actually userParameters; type is "varies" (0_o)  But standards book says DT is CX.  whatDomainsReturned is also not in the schemas, but in the standards book.  Has data type CX.
    "QRD": [ "queryDateTime", "queryFormatCode", "queryPriority", "queryId", "deferredResponseType", "deferredResponseDateTime", "quantityLimitedRequest", "whoSubjectFilter", "whatSubjectFilter", "whatDepartmentDataCode", "whatDataCodeValueQual", "queryResultsLevel" ],
    "QRF": [ "whereSubjectFilter", "whenDataStartDateTime", "whenDataEndDateTime", "whatUserQualifier", "otherQrySubjectFilter", "whichDateTimeQualifier", "whichDateTimeStatusQualifier", "dateTimeSelectionQualifier", "whenQuantityTimingQualifier", "searchConfidenceThreshold" ],
    "QRI": [ "candidateConfidence", "matchReasonCode", "algorithmDescriptor" ],
    "RCP": [ "queryPriority", "quantityLimitedRequest", "responseModality", "executionAndDeliveryTime", "modifyIndicator", "sortByField", "segmentGroupInclusion" ],
    "RDF": [ "numberOfColumnsPerRow", "columnDescription" ],
    "RDT": [ "columnValue" ],
    "RF1": [ "referralStatus", "referralPriority", "referralType", "referralDisposition", "referralCategory", "originatingReferralIdentifier", "effectiveDate", "expirationDate", "processDate", "referralReason", "externalReferralIdentifier" ],
    "RGS": [ "setIdRgs", "segmentActionCode", "resourceGroupId" ],
    "RMI": [ "riskManagementIncidentCode", "dateTimeIncident", "incidentTypeCode" ],
    "ROL": [ "roleInstanceId", "actionCode", "roleRol", "rolePerson", "roleBeginDateTime", "roleEndDateTime", "roleDuration", "roleActionReason", "providerType", "organizationUnitType", "officeHomeAddressBirthplace", "phone" ],
    "RQ1": [ "anticipatedPrice", "manufacturerIdentifier", "manufacturersCatalog", "vendorId", "vendorCatalog", "taxable", "substituteAllowed" ],
    "RQD": [ "requisitionLineNumber", "itemCodeInternal", "itemCodeExternal", "hospitalItemCode", "requisitionQuantity", "requisitionUnitOfMeasure", "deptCostCenter", "itemNaturalAccountCode", "deliverToId", "dateNeeded" ],
    "RXA": [ "giveSubIdCounter", "administrationSubIdCounter", "dateTimeStartOfAdministration", "dateTimeEndOfAdministration", "administeredCode", "administeredAmount", "administeredUnits", "administeredDosageForm", "administrationNotes", "administeringProvider", "administeredAtLocation", "administeredPer", "administeredStrength", "administeredStrengthUnits", "substanceLotNumber", "substanceExpirationDate", "substanceManufacturerName", "substanceTreatmentRefusalReason", "indication", "completionStatus", "actionCodeRxa", "systemEntryDateTime", "administeredDrugStrengthVolume", "administeredDrugStrengthVolumeUnits", "administeredBarcodeIdentifier", "pharmacyOrderType" ],
    "RXC": [ "rxComponentType", "componentCode", "componentAmount", "componentUnits", "componentStrength", "componentStrengthUnits", "supplementaryCode", "componentDrugStrengthVolume", "componentDrugStrengthVolumeUnits" ],
    "RXD": [ "dispenseSubIdCounter", "dispenseGiveCode", "dateTimeDispensed", "actualDispenseAmount", "actualDispenseUnits", "actualDosageForm", "prescriptionNumber", "numberOfRefillsRemaining", "dispenseNotes", "dispensingProvider", "substitutionStatus", "totalDailyDose", "dispenseToLocation", "needsHumanReview", "pharmacyTreatmentSuppliersSpecialDispensingInstructions", "actualStrength", "actualStrengthUnit", "substanceLotNumber", "substanceExpirationDate", "substanceManufacturerName", "indication", "dispensePackageSize", "dispensePackageSizeUnit", "dispensePackageMethod", "supplementaryCode", "initiatingLocation", "packagingAssemblyLocation", "actualDrugStrengthVolume", "actualDrugStrengthVolumeUnits", "dispenseToPharmacy", "dispenseToPharmacyAddress", "pharmacyOrderType", "dispenseType" ],
    "RXE": [ "quantityTiming", "giveCode", "giveAmountMinimum", "giveAmountMaximum", "giveUnits", "giveDosageForm", "providersAdministrationInstructions", "deliverToLocation", "substitutionStatus", "dispenseAmount", "dispenseUnits", "numberOfRefills", "orderingProvidersDeaNumber", "pharmacistTreatmentSuppliersVerifierId", "prescriptionNumber", "numberOfRefillsRemaining", "numberOfRefillsDosesDispensed", "dTOfMostRecentRefillOrDoseDispensed", "totalDailyDose", "needsHumanReview", "pharmacyTreatmentSuppliersSpecialDispensingInstructions", "givePer", "giveRateAmount", "giveRateUnits", "giveStrength", "giveStrengthUnits", "giveIndication", "dispensePackageSize", "dispensePackageSizeUnit", "dispensePackageMethod", "supplementaryCode", "originalOrderDateTime", "giveDrugStrengthVolume", "giveDrugStrengthVolumeUnits", "controlledSubstanceSchedule", "formularyStatus", "pharmaceuticalSubstanceAlternative", "pharmacyOfMostRecentFill", "initialDispenseAmount", "dispensingPharmacy", "dispensingPharmacyAddress", "deliverToPatientLocation", "deliverToAddress", "pharmacyOrderType" ],
    "RXG": [ "giveSubIdCounter", "dispenseSubIdCounter", "quantityTiming", "giveCode", "giveAmountMinimum", "giveAmountMaximum", "giveUnits", "giveDosageForm", "administrationNotes", "substitutionStatus", "dispenseToLocation", "needsHumanReview", "pharmacyTreatmentSuppliersSpecialAdministrationInstructions", "givePer", "giveRateAmount", "giveRateUnits", "giveStrength", "giveStrengthUnits", "substanceLotNumber", "substanceExpirationDate", "substanceManufacturerName", "indication", "giveDrugStrengthVolume", "giveDrugStrengthVolumeUnits", "giveBarcodeIdentifier", "pharmacyOrderType" ],
    "RXO": [ "requestedGiveCode", "requestedGiveAmountMinimum", "requestedGiveAmountMaximum", "requestedGiveUnits", "requestedDosageForm", "providersPharmacyTreatmentInstructions", "providersAdministrationInstructions", "deliverToLocation", "allowSubstitutions", "requestedDispenseCode", "requestedDispenseAmount", "requestedDispenseUnits", "numberOfRefills", "orderingProvidersDeaNumber", "pharmacistTreatmentSuppliersVerifierId", "needsHumanReview", "requestedGivePer", "requestedGiveStrength", "requestedGiveStrengthUnits", "indication", "requestedGiveRateAmount", "requestedGiveRateUnits", "totalDailyDose", "supplementaryCode", "requestedDrugStrengthVolume", "requestedDrugStrengthVolumeUnits", "pharmacyOrderType", "dispensingInterval" ],
    "RXR": [ "route", "administrationSite", "administrationDevice", "administrationMethod", "routingInstruction", "administrationSiteModifier" ],
    "SAC": [ "externalAccessionIdentifier", "accessionIdentifier", "containerIdentifier", "primaryContainerIdentifier", "equipmentContainerIdentifier", "specimenSource", "registrationDateTime", "containerStatus", "carrierType", "carrierIdentifier", "positionInCarrier", "trayTypeSac", "trayIdentifier", "positionInTray", "location", "containerHeight", "containerDiameter", "barrierDelta", "bottomDelta", "containerHeightDiameterDeltaUnits", "containerVolume", "availableSpecimenVolume", "initialSpecimenVolume", "volumeUnits", "separatorType", "capType", "additive", "specimenComponent", "dilutionFactor", "treatment", "temperature", "hemolysisIndex", "hemolysisIndexUnits", "lipemiaIndex", "lipemiaIndexUnits", "icterusIndex", "icterusIndexUnits", "fibrinIndex", "fibrinIndexUnits", "systemInducedContaminants", "drugInterference", "artificialBlood", "specialHandlingCode", "otherEnvironmentalFactors" ],
    "SCH": [ "placerAppointmentId", "fillerAppointmentId", "occurrenceNumber", "placerGroupNumber", "scheduleId", "eventReason", "appointmentReason", "appointmentType", "appointmentDuration", "appointmentDurationUnits", "appointmentTimingQuantity", "placerContactPerson", "placerContactPhoneNumber", "placerContactAddress", "placerContactLocation", "fillerContactPerson", "fillerContactPhoneNumber", "fillerContactAddress", "fillerContactLocation", "enteredByPerson", "enteredByPhoneNumber", "enteredByLocation", "parentPlacerAppointmentId", "parentFillerAppointmentId", "fillerStatusCode", "placerOrderNumber", "fillerOrderNumber" ],
    "SFT": [ "softwareVendorOrganization", "softwareCertifiedVersionOrReleaseNumber", "softwareProductName", "softwareBinaryId", "softwareProductInformation", "softwareInstallDate" ],
    "SID": [ "applicationMethodIdentifier", "substanceLotNumber", "substanceContainerIdentifier", "substanceManufacturerIdentifier" ],
    "SPM": [ "setIdSpm", "specimenId", "specimenParentIDs", "specimenType", "specimenTypeModifier", "specimenAdditives", "specimenCollectionMethod", "specimenSourceSite", "specimenSourceSiteModifier", "specimenCollectionSite", "specimenRole", "specimenCollectionAmount", "groupedSpecimenCount", "specimenDescription", "specimenHandlingCode", "specimenRiskCode", "specimenCollectionDateTime", "specimenReceivedDateTime", "specimenExpirationDateTime", "specimenAvailability", "specimenRejectReason", "specimenQuality", "specimenAppropriateness", "specimenCondition", "specimenCurrentQuantity", "numberOfSpecimenContainers", "containerType", "containerCondition", "specimenChildRole" ],
    "SPR": [ "queryTag", "queryResponseFormatCode", "storedProcedureName", "inputParameterList" ],
    "STF": [ "primaryKeyValueStf", "staffIdentifierList", "staffName", "staffType", "administrativeSex", "dateTimeOfBirth", "activeInactiveFlag", "department", "hospitalServiceStf", "phone", "officeHomeAddressBirthplace", "institutionActivationDate", "institutionInactivationDate", "backupPersonId", "eMailAddress", "preferredMethodOfContact", "maritalStatus", "jobTitle", "jobCodeClass", "employmentStatusCode", "additionalInsuredOnAuto", "driversLicenseNumberStaff", "copyAutoIns", "autoInsExpires", "dateLastDmvReview", "dateNextDmvReview", "race", "ethnicGroup", "reActivationApprovalIndicator", "citizenship", "deathDateAndTime", "deathIndicator", "institutionRelationshipTypeCode", "institutionRelationshipPeriod", "expectedReturnDate", "costCenterCode", "genericClassificationIndicator", "inactiveReasonCode" ],
    "TCC": [ "universalServiceIdentifier", "testApplicationIdentifier", "specimenSource", "autoDilutionFactorDefault", "rerunDilutionFactorDefault", "preDilutionFactorDefault", "endogenousContentOfPreDilutionDiluent", "inventoryLimitsWarningLevel", "automaticRerunAllowed", "automaticRepeatAllowed", "automaticReflexAllowed", "equipmentDynamicRange", "units", "processingType" ],
    "TCD": [ "universalServiceIdentifier", "autoDilutionFactor", "rerunDilutionFactor", "preDilutionFactor", "endogenousContentOfPreDilutionDiluent", "automaticRepeatAllowed", "reflexAllowed", "analyteRepeatStatus" ],
    "TQ1": [ "setIdTq1", "quantity", "repeatPattern", "explicitTime", "relativeTimeAndUnits", "serviceDuration", "startDateTime", "endDateTime", "priority", "conditionText", "textInstruction", "conjunction", "occurrenceDuration", "totalOccurrences" ],
    "TQ2": [ "setIdTq2", "sequenceResultsFlag", "relatedPlacerNumber", "relatedFillerNumber", "relatedPlacerGroupNumber", "sequenceConditionCode", "cyclicEntryExitIndicator", "sequenceConditionTimeInterval", "cyclicGroupMaximumNumberOfRepeats", "specialServiceRequestRelationship" ],
    "TXA": [ "setIdTxa", "documentType", "documentContentPresentation", "activityDateTime", "primaryActivityProviderCodeName", "originationDateTime", "transcriptionDateTime", "editDateTime", "originatorCodeName", "assignedDocumentAuthenticator", "transcriptionistCodeName", "uniqueDocumentNumber", "parentDocumentNumber", "placerOrderNumber", "fillerOrderNumber", "uniqueDocumentFileName", "documentCompletionStatus", "documentConfidentialityStatus", "documentAvailabilityStatus", "documentStorageStatus", "documentChangeReason", "authenticationPersonTimeStamp", "distributedCopies" ],
    "UB1": [ "setIdUb1", "bloodDeductible", "bloodFurnishedPintsOf", "bloodReplacedPints", "bloodNotReplacedPints", "coInsuranceDays", "conditionCode", "coveredDays", "nonCoveredDays", "valueAmountCode", "numberOfGraceDays", "specialProgramIndicator", "psroUrApprovalIndicator", "psroUrApprovedStayFm", "psroUrApprovedStayTo", "occurrence", "occurrenceSpan", "occurSpanStartDate", "occurSpanEndDate", "ub82Locator2", "ub82Locator9", "ub82Locator27", "ub82Locator45" ],
    "UB2": [ "setIdUb2", "coInsuranceDays", "conditionCode", "coveredDays", "nonCoveredDays", "valueAmountCode", "occurrenceCodeDate", "occurrenceSpanCodeDates", "ub92Locator2", "ub92Locator11", "ub92Locator31", "documentControlNumber", "ub92Locator49", "ub92Locator56", "ub92Locator57", "ub92Locator78", "specialVisitCount" ],
    "URD": [ "rUDateTime", "reportPriority", "rUWhoSubjectDefinition", "rUWhatSubjectDefinition", "rUWhatDepartmentCode", "rUDisplayPrintLocations", "rUResultsLevel" ],
    "URS": [ "rUWhereSubjectDefinition", "rUWhenDataStartDateTime", "rUWhenDataEndDateTime", "rUWhatUserQualifier", "rUOtherResultsSubjectDefinition", "rUWhichDateTimeQualifier", "rUWhichDateTimeStatusQualifier", "rUDateTimeSelectionQualifier", "rUQuantityTimingQualifier" ],
    "VAR": [ "varianceInstanceId", "documentedDateTime", "statedVarianceDateTime", "varianceOriginator", "varianceClassification", "varianceDescription" ],
    "VTQ": [ "queryTag", "queryResponseFormatCode", "vtQueryName", "virtualTableName", "selectionCriteria" ],
    "selectionCriteria": [ "segmentFieldName", "relationalOperator", "value", "relationalConjunction" ],
    "virtualTableName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "vtQueryName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "varianceClassification": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "varianceOriginator": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "assigningAgencyOrDepartment": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "assigningJurisdiction": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "expirationDate": [ "time", "degreeOfPrecision" ],
    "effectiveDate": [ "time", "degreeOfPrecision" ],
    "nameValidityRange": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "rangeEndDateTime": [ "time", "degreeOfPrecision" ],
    "rangeStartDateTime": [ "time", "degreeOfPrecision" ],
    "nameContext": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "assigningFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "assigningAuthority": [ "namespaceId", "universalId", "universalIdType" ],
    "familyName": [ "surname", "ownSurnamePrefix", "ownSurname", "surnamePrefixFromPartnerSpouse", "surnameFromPartnerSpouse" ],
    "statedVarianceDateTime": [ "time", "degreeOfPrecision" ],
    "documentedDateTime": [ "time", "degreeOfPrecision" ],
    "varianceInstanceId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "rUQuantityTimingQualifier": [ "quantity", "interval", "duration", "startDateTime", "endDateTime", "priority", "condition", "text", "conjunction", "orderSequencing", "occurrenceDuration", "totalOccurrences" ],
    "occurrenceDuration": [ "quantity", "units" ],
    "orderSequencing": [ "sequenceResultsFlag", "placerOrderNumberEntityIdentifier", "placerOrderNumberNamespaceId", "fillerOrderNumberEntityIdentifier", "fillerOrderNumberNamespaceId", "sequenceConditionValue", "maximumNumberOfRepeats", "placerOrderNumberUniversalId", "placerOrderNumberUniversalIdType", "fillerOrderNumberUniversalId", "fillerOrderNumberUniversalIdType" ],
    "endDateTime": [ "time", "degreeOfPrecision" ],
    "startDateTime": [ "time", "degreeOfPrecision" ],
    "interval": [ "repeatPattern", "explicitTimeInterval" ],
    "quantity": [ "value", "units" ],
    "units": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "rUWhenDataEndDateTime": [ "time", "degreeOfPrecision" ],
    "rUWhenDataStartDateTime": [ "time", "degreeOfPrecision" ],
    "rUWhatDepartmentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "rUWhatSubjectDefinition": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "rUWhoSubjectDefinition": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "rUDateTime": [ "time", "degreeOfPrecision" ],
    "occurrenceSpanCodeDates": [ "occurrenceSpanCode", "occurrenceSpanStartDate", "occurrenceSpanStopDate" ],
    "occurrenceSpanCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "occurrenceCodeDate": [ "occurrenceCode", "occurrenceDate" ],
    "occurrenceCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "valueAmountCode": [ "valueCode", "valueAmount" ],
    "valueAmount": [ "quantity", "denomination" ],
    "valueCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "occurrenceSpan": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "occurrence": [ "occurrenceCode", "occurrenceDate" ],
    "psroUrApprovalIndicator": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "specialProgramIndicator": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "distributedCopies": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "authenticationPersonTimeStamp": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "dateTimeActionPerformed", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "dateTimeActionPerformed": [ "time", "degreeOfPrecision" ],
    "fillerOrderNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "placerOrderNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "parentDocumentNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "uniqueDocumentNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "transcriptionistCodeName": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "assignedDocumentAuthenticator": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "originatorCodeName": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "editDateTime": [ "time", "degreeOfPrecision" ],
    "transcriptionDateTime": [ "time", "degreeOfPrecision" ],
    "originationDateTime": [ "time", "degreeOfPrecision" ],
    "primaryActivityProviderCodeName": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "activityDateTime": [ "time", "degreeOfPrecision" ],
    "sequenceConditionTimeInterval": [ "quantity", "units" ],
    "relatedPlacerGroupNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "relatedFillerNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "relatedPlacerNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "priority": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "serviceDuration": [ "quantity", "units" ],
    "relativeTimeAndUnits": [ "quantity", "units" ],
    "repeatPattern": [ "repeatPatternCode", "calendarAlignment", "phaseRangeBeginValue", "phaseRangeEndValue", "periodQuantity", "periodUnits", "institutionSpecifiedTime", "event", "eventOffsetQuantity", "eventOffsetUnits", "generalTimingSpecification" ],
    "repeatPatternCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "analyteRepeatStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "endogenousContentOfPreDilutionDiluent": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "preDilutionFactor": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "rerunDilutionFactor": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "autoDilutionFactor": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "universalServiceIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "processingType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "equipmentDynamicRange": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "preDilutionFactorDefault": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "rerunDilutionFactorDefault": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "autoDilutionFactorDefault": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "specimenSource": [ "specimenSourceNameOrCode", "additives", "specimenCollectionMethod", "bodySite", "siteModifier", "collectionMethodModifierCode", "specimenRole" ],
    "specimenRole": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "collectionMethodModifierCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "siteModifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bodySite": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "additives": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenSourceNameOrCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "testApplicationIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "inactiveReasonCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "costCenterCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "institutionRelationshipPeriod": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "institutionRelationshipTypeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "deathDateAndTime": [ "time", "degreeOfPrecision" ],
    "citizenship": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "ethnicGroup": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "race": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "driversLicenseNumberStaff": [ "licenseNumber", "issuingStateProvinceCountry", "expirationDate" ],
    "employmentStatusCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "jobCodeClass": [ "jobCode", "jobClass", "jobDescriptionText" ],
    "maritalStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "preferredMethodOfContact": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "backupPersonId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "institutionInactivationDate": [ "date", "institutionName" ],
    "institutionName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "date": [ "time", "degreeOfPrecision" ],
    "institutionActivationDate": [ "date", "institutionName" ],
    "officeHomeAddressBirthplace": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "addressValidityRange": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "streetAddress": [ "streetOrMailingAddress", "streetName", "dwellingNumber" ],
    "phone": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "hospitalServiceStf": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "department": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeOfBirth": [ "time", "degreeOfPrecision" ],
    "staffName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "staffIdentifierList": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "primaryKeyValueStf": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "inputParameterList": [ "segmentFieldName", "values" ],
    "storedProcedureName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "specimenChildRole": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "containerCondition": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "containerType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenCurrentQuantity": [ "quantity", "units" ],
    "specimenCondition": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenAppropriateness": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenQuality": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenRejectReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenExpirationDateTime": [ "time", "degreeOfPrecision" ],
    "specimenReceivedDateTime": [ "time", "degreeOfPrecision" ],
    "specimenCollectionDateTime": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "specimenRiskCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenHandlingCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenCollectionAmount": [ "quantity", "units" ],
    "specimenCollectionSite": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenSourceSiteModifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenSourceSite": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenCollectionMethod": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenAdditives": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenTypeModifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "specimenParentIDs": [ "placerAssignedIdentifier", "fillerAssignedIdentifier" ],
    "fillerAssignedIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "placerAssignedIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "specimenId": [ "placerAssignedIdentifier", "fillerAssignedIdentifier" ],
    "substanceManufacturerIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "applicationMethodIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "softwareInstallDate": [ "time", "degreeOfPrecision" ],
    "softwareVendorOrganization": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "fillerStatusCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "parentFillerAppointmentId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "parentPlacerAppointmentId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "enteredByLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "assigningAuthorityForLocation": [ "namespaceId", "universalId", "universalIdType" ],
    "comprehensiveLocationIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "facility": [ "namespaceId", "universalId", "universalIdType" ],
    "enteredByPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "enteredByPerson": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "fillerContactLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "fillerContactAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "fillerContactPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "fillerContactPerson": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "placerContactLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "placerContactAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "placerContactPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "placerContactPerson": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "appointmentTimingQuantity": [ "quantity", "interval", "duration", "startDateTime", "endDateTime", "priority", "condition", "text", "conjunction", "orderSequencing", "occurrenceDuration", "totalOccurrences" ],
    "appointmentDurationUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "appointmentType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "appointmentReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "eventReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "scheduleId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "placerGroupNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "fillerAppointmentId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "placerAppointmentId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "otherEnvironmentalFactors": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "specialHandlingCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "artificialBlood": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "drugInterference": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "systemInducedContaminants": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "fibrinIndexUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "icterusIndexUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "lipemiaIndexUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "hemolysisIndexUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "temperature": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "treatment": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dilutionFactor": [ "comparator", "num1", "separatorSuffix", "num2" ],
    "specimenComponent": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "additive": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "capType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "separatorType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "volumeUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "containerHeightDiameterDeltaUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "location": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "positionInTray": [ "value1", "value2", "value3", "value4" ],
    "trayIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "trayTypeSac": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "positionInCarrier": [ "value1", "value2", "value3", "value4" ],
    "carrierIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "carrierType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "containerStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "registrationDateTime": [ "time", "degreeOfPrecision" ],
    "equipmentContainerIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "primaryContainerIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "containerIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "accessionIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "externalAccessionIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "administrationSiteModifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "routingInstruction": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "administrationMethod": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "administrationDevice": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "administrationSite": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "route": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requestedDrugStrengthVolumeUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "supplementaryCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "totalDailyDose": [ "quantity", "units" ],
    "requestedGiveRateUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "indication": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requestedGiveStrengthUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "pharmacistTreatmentSuppliersVerifierId": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "orderingProvidersDeaNumber": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "requestedDispenseUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requestedDispenseCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "deliverToLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "patientLocationType", "building", "floor", "address" ],
    "address": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "providersAdministrationInstructions": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "providersPharmacyTreatmentInstructions": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requestedDosageForm": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requestedGiveUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requestedGiveCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "giveBarcodeIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "giveDrugStrengthVolumeUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "substanceManufacturerName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "substanceExpirationDate": [ "time", "degreeOfPrecision" ],
    "giveStrengthUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "giveRateUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "pharmacyTreatmentSuppliersSpecialAdministrationInstructions": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dispenseToLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "patientLocationType", "building", "floor", "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation" ],
    "administrationNotes": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "giveDosageForm": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "giveUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "giveCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "quantityTiming": [ "quantity", "interval", "duration", "startDateTime", "endDateTime", "priority", "condition", "text", "conjunction", "orderSequencing", "occurrenceDuration", "totalOccurrences" ],
    "deliverToAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "deliverToPatientLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "dispensingPharmacyAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "dispensingPharmacy": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "pharmacyOfMostRecentFill": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "pharmaceuticalSubstanceAlternative": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "controlledSubstanceSchedule": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "originalOrderDateTime": [ "time", "degreeOfPrecision" ],
    "dispensePackageSizeUnit": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "giveIndication": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "pharmacyTreatmentSuppliersSpecialDispensingInstructions": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dTOfMostRecentRefillOrDoseDispensed": [ "time", "degreeOfPrecision" ],
    "dispenseUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dispenseType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "dispenseToPharmacyAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "dispenseToPharmacy": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "actualDrugStrengthVolumeUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "packagingAssemblyLocation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "initiatingLocation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "actualStrengthUnit": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dispensingProvider": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "actualDosageForm": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "actualDispenseUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeDispensed": [ "time", "degreeOfPrecision" ],
    "dispenseGiveCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "componentDrugStrengthVolumeUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "componentStrengthUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "componentUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "componentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "administeredBarcodeIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "administeredDrugStrengthVolumeUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "systemEntryDateTime": [ "time", "degreeOfPrecision" ],
    "substanceTreatmentRefusalReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "administeredStrengthUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "administeredAtLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "patientLocationType", "building", "floor", "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation" ],
    "administeringProvider": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "administeredDosageForm": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "administeredUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "administeredCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeEndOfAdministration": [ "time", "degreeOfPrecision" ],
    "dateTimeStartOfAdministration": [ "time", "degreeOfPrecision" ],
    "deliverToId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requisitionUnitOfMeasure": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "hospitalItemCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "itemCodeExternal": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "itemCodeInternal": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "vendorId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "manufacturerIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "organizationUnitType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "providerType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "roleActionReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "roleDuration": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "roleEndDateTime": [ "time", "degreeOfPrecision" ],
    "roleBeginDateTime": [ "time", "degreeOfPrecision" ],
    "rolePerson": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "roleRol": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "roleInstanceId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "incidentTypeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeIncident": [ "time", "degreeOfPrecision" ],
    "riskManagementIncidentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "resourceGroupId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "externalReferralIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "referralReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "processDate": [ "time", "degreeOfPrecision" ],
    "originatingReferralIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "referralCategory": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "referralDisposition": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "referralType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "referralPriority": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "referralStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "columnDescription": [ "segmentFieldName", "hl7DataType", "maximumColumnWidth" ],
    "sortByField": [ "value", "sequencing" ],
    "executionAndDeliveryTime": [ "time", "degreeOfPrecision" ],
    "responseModality": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "quantityLimitedRequest": [ "quantity", "units" ],
    "algorithmDescriptor": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "whenQuantityTimingQualifier": [ "quantity", "interval", "duration", "startDateTime", "endDateTime", "priority", "condition", "text", "conjunction", "orderSequencing", "occurrenceDuration", "totalOccurrences" ],
    "whenDataEndDateTime": [ "time", "degreeOfPrecision" ],
    "whenDataStartDateTime": [ "time", "degreeOfPrecision" ],
    "whatDataCodeValueQual": [ "firstDataCodeValue", "lastDataCodeValue" ],
    "whatDepartmentDataCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "whatSubjectFilter": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "whoSubjectFilter": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "deferredResponseDateTime": [ "time", "degreeOfPrecision" ],
    "queryDateTime": [ "time", "degreeOfPrecision" ],
    "messageQueryName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "expectedPreAdmissionTestingDateTime": [ "time", "degreeOfPrecision" ],
    "expectedLoaReturnDateTime": [ "time", "degreeOfPrecision" ],
    "advanceDirectiveCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "patientConditionCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "precautionCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "admissionLevelOfCareCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "recreationalDrugUseCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "modeOfArrivalCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "expectedSurgeryDateAndTime": [ "time", "degreeOfPrecision" ],
    "patientChargeAdjustmentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "clinicOrganizationName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "referralSourceCode": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "expectedDischargeDateTime": [ "time", "degreeOfPrecision" ],
    "expectedAdmitDateTime": [ "time", "degreeOfPrecision" ],
    "transferReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "admitReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "accommodationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "priorPendingLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "otherHealthcareProvider": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "alternateVisitId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "dischargeDateTime": [ "time", "degreeOfPrecision" ],
    "admitDateTime": [ "time", "degreeOfPrecision" ],
    "priorTemporaryLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "pendingLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "dietType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dischargedToLocation": [ "dischargeLocation", "effectiveDate" ],
    "financialClass": [ "financialClassCode", "effectiveDate" ],
    "visitNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "admittingDoctor": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "temporaryLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "consultingDoctor": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "referringDoctor": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "attendingDoctor": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "priorPatientLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "preadmitNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "assignedPatientLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "changePathwayLifeCycleStatusDateTime": [ "time", "degreeOfPrecision" ],
    "pathwayLifeCycleStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "pathwayEstablishedDateTime": [ "time", "degreeOfPrecision" ],
    "pathwayInstanceId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "pathwayId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "quantityInUse": [ "quantity", "units" ],
    "quantityDistributed": [ "quantity", "units" ],
    "quantityManufactured": [ "quantity", "units" ],
    "reportIntervalEndDate": [ "time", "degreeOfPrecision" ],
    "reportIntervalStartDate": [ "time", "degreeOfPrecision" ],
    "reportDate": [ "time", "degreeOfPrecision" ],
    "effectiveEndDateOfProviderRole": [ "time", "degreeOfPrecision" ],
    "effectiveStartDateOfProviderRole": [ "time", "degreeOfPrecision" ],
    "providerIdentifiers": [ "idNumber", "typeOfIdNumber", "stateOtherQualifyingInformation", "expirationDate" ],
    "providerCommunicationInformation": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "providerLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "providerAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "providerName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "providerRole": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "cost": [ "quantity", "denomination" ],
    "billingCategory": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "effectiveEndDate": [ "time", "degreeOfPrecision" ],
    "effectiveStartDate": [ "time", "degreeOfPrecision" ],
    "maximumPrice": [ "quantity", "denomination" ],
    "minimumPrice": [ "quantity", "denomination" ],
    "price": [ "value", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "rangeUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "facilityIdPrc": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "primaryKeyValuePrc": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "securitySensitivity": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "individualAwarenessOfPrognosis": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "problemPrognosis": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "individualAwarenessOfProblem": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "certaintyOfProblem": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "problemRanking": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "problemDateOfOnset": [ "time", "degreeOfPrecision" ],
    "problemLifeCycleStatusDateTime": [ "time", "degreeOfPrecision" ],
    "problemLifeCycleStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "problemConfirmationStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "problemPersistence": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "problemManagementDiscipline": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "problemClassification": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "actualProblemResolutionDateTime": [ "time", "degreeOfPrecision" ],
    "anticipatedProblemResolutionDateTime": [ "time", "degreeOfPrecision" ],
    "problemEstablishedDateTime": [ "time", "degreeOfPrecision" ],
    "episodeOfCareId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "problemInstanceId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "problemId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "actionDateTime": [ "time", "degreeOfPrecision" ],
    "governmentReimbursementBillingEligibility": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "institution": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "privileges": [ "privilege", "privilegeClass", "expirationDate", "activationDate", "facility" ],
    "privilegeClass": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "privilege": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "practitionerIdNumbers": [ "idNumber", "typeOfIdNumber", "stateOtherQualifyingInformation", "expirationDate" ],
    "specialty": [ "specialtyName", "governingBoard", "eligibleOrCertified", "dateOfCertification" ],
    "practitionerGroup": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "primaryKeyValuePra": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "procedureIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "tissueTypeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "procedureCodeModifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "associatedDiagnosisCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "consentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "procedurePractitioner": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "surgeon": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "anesthesiologist": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "procedureDateTime": [ "time", "degreeOfPrecision" ],
    "procedureCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "tribalCitizenship": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "productionClassCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "breedCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "speciesCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "lastUpdateFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "lastUpdateDateTime": [ "time", "degreeOfPrecision" ],
    "patientDeathDateAndTime": [ "time", "degreeOfPrecision" ],
    "nationality": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "veteransMilitaryStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "mothersIdentifier": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "driversLicenseNumberPatient": [ "licenseNumber", "issuingStateProvinceCountry", "expirationDate" ],
    "patientAccountNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "religion": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "primaryLanguage": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "phoneNumberBusiness": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "phoneNumberHome": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "patientAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "patientAlias": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "mothersMaidenName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "patientName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "alternatePatientIdPid": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "patientIdentifierList": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "patientId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "whatDomainsReturned": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "eventReportDate": [ "time", "degreeOfPrecision" ],
    "senderAwareDateTime": [ "time", "degreeOfPrecision" ],
    "senderEventIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "senderTelephone": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "senderAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "senderIndividualName": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "senderOrganizationName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "primaryObserverAwareDateTime": [ "time", "degreeOfPrecision" ],
    "primaryObserverTelephone": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "primaryObserverAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "primaryObserverName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "causeOfDeath": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "eventLocationOccurredAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "eventEndedDataTime": [ "time", "degreeOfPrecision" ],
    "eventImprovedDateTime": [ "time", "degreeOfPrecision" ],
    "eventExacerbationDateTime": [ "time", "degreeOfPrecision" ],
    "eventOnsetDateTime": [ "time", "degreeOfPrecision" ],
    "eventSymptomDiagnosisCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "eventIdentifiersUsed": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateLastMarketed": [ "time", "degreeOfPrecision" ],
    "dateFirstMarketed": [ "time", "degreeOfPrecision" ],
    "expectedShelfLife": [ "quantity", "units" ],
    "labeledShelfLife": [ "quantity", "units" ],
    "productCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "genericName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "country": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "manufacturerDistributor": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "autopsyPerformedBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "autopsyStartAndEndDateTime": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "deathCertifiedBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "deathCertificateSignedDateTime": [ "time", "degreeOfPrecision" ],
    "deathLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "deathCauseCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "placeOfWorship": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "publicityCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "duplicatePatient": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "patientPrimaryCareProviderNameIdNo": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "patientPrimaryFacility": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "dateProductReturnedToManufacturer": [ "time", "degreeOfPrecision" ],
    "productEvaluationResults": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "productEvaluationStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "productEvaluationPerformed": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "indicationForProductUse": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "productExplantationDate": [ "time", "degreeOfPrecision" ],
    "productImplantationDate": [ "time", "degreeOfPrecision" ],
    "productExpirationDate": [ "time", "degreeOfPrecision" ],
    "productManufactureDate": [ "time", "degreeOfPrecision" ],
    "totalDurationOfTherapy": [ "quantity", "units" ],
    "productClass": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "implicatedProduct": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "overrideAuthorizedBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "overrideEnteredBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "businessRuleOverrideCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "businessRuleOverrideType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "effectiveDateRange": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "healthCareProviderAreaOfSpecializationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "healthCareProviderClassificationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "healthCareProviderTypeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "practitionerOrgUnitIdentifier": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "organizationUnitTypeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "organizationUnitCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "entererAuthorizationMode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "orderType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "confidentialityCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "fillersExpectedAvailabilityDateTime": [ "time", "degreeOfPrecision" ],
    "advancedBeneficiaryNoticeOverrideReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "orderStatusModifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "orderingProviderAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "orderingFacilityPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "orderingFacilityAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "orderingFacilityName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "advancedBeneficiaryNoticeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "actionBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "enteringDevice": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "enteringOrganization": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "orderControlCodeReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "orderEffectiveDateTime": [ "time", "degreeOfPrecision" ],
    "callBackPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "enterersLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "orderingProvider": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "verifiedBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "enteredBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "dateTimeOfTransaction": [ "time", "degreeOfPrecision" ],
    "parent": [ "placerAssignedIdentifier", "fillerAssignedIdentifier" ],
    "primaryKeyValueCdm": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "orderableAtLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "effectiveDateTimeOfChange": [ "time", "degreeOfPrecision" ],
    "consentWaitingPeriodUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "consentIntervalUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "consentEffectiveEndDateTime": [ "time", "degreeOfPrecision" ],
    "consentEffectiveStartDateTime": [ "time", "degreeOfPrecision" ],
    "consentIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "testServiceDefaultDurationUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "effectiveTestServiceEndDateTime": [ "time", "degreeOfPrecision" ],
    "effectiveTestServiceStartDateTime": [ "time", "degreeOfPrecision" ],
    "categoryIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "testObservationsIncludedWithinAnOrderedTestBattery": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "specimenRetentionTime": [ "quantity", "units" ],
    "minimumCollectionVolume": [ "quantity", "units" ],
    "normalCollectionVolume": [ "quantity", "units" ],
    "specimen": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "containerUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "criticalTextCodesForCategoricalObservations": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "abnormalTextCodesForCategoricalObservations": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "normalTextCodesForCategoricalObservations": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "validCodedAnswers": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "preferredCodingSystem": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "deltaCheckCriteria": [ "normalRange", "numericThreshold", "changeComputation", "daysRetained" ],
    "normalRange": [ "lowValue", "highValue" ],
    "absoluteRangeForOrdinalAndContinuousObservations": [ "numericRange", "administrativeSex", "ageRange", "gestationalAgeRange", "species", "raceSubspecies", "conditions" ],
    "gestationalAgeRange": [ "lowValue", "highValue" ],
    "ageRange": [ "lowValue", "highValue" ],
    "numericRange": [ "lowValue", "highValue" ],
    "criticalRangeForOrdinalAndContinuousObservations": [ "numericRange", "administrativeSex", "ageRange", "gestationalAgeRange", "species", "raceSubspecies", "conditions" ],
    "referenceRangeOrdinalAndContinuousObservations": [ "numericRange", "administrativeSex", "ageRange", "gestationalAgeRange", "species", "raceSubspecies", "conditions" ],
    "correspondingSiUnitsOfMeasure": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "unitsOfMeasure": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "modalityOfImagingMeasurement": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "targetAnatomicSiteOfTest": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "relationshipModifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "pointVersusInterval": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "kindOfQuantityObserved": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "procedureMedication": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "fixedCannedMessage": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "reflexTestsObservations": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "contraindicationsToObservations": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "observationsRequiredToInterpretTheObservation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "phoneNumberOfOutsideSite": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "addressOfOutsideSite": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "outsideSiteWhereObservationMayBePerformed": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeStampForAnyChangeInDefinitionForTheObservation": [ "time", "degreeOfPrecision" ],
    "reportSubheader": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "telephoneNumberOfSection": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "observationProducingDepartmentSection": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "codedRepresentationOfMethod": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "identityOfInstrumentUsedToPerformThisStudy": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "otherServiceTestObservationIDsForTheObservation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "producerId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "producersServiceTestObservationId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "servicePeriod": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "trayType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dietSupplementOrPreferenceCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeOfTheAnalysis": [ "time", "degreeOfPrecision" ],
    "equipmentInstanceIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "observationMethod": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "responsibleObserver": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "producersId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeOfTheObservation": [ "time", "degreeOfPrecision" ],
    "effectiveDateOfReferenceRange": [ "time", "degreeOfPrecision" ],
    "observationIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "medicallyNecessaryDuplicateProcedureReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "fillerSupplementalServiceInformation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "placerSupplementalServiceInformation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "plannedPatientTransportComment": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "transportArrangementResponsibility": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "collectorsComment": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "transportLogisticsOfCollectedSample": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "scheduledDateTime": [ "time", "degreeOfPrecision" ],
    "transcriptionist": [ "name", "startDateTime", "endDateTime", "pointOfCare", "room", "bed", "facility", "locationStatus", "patientLocationType", "building", "floor" ],
    "name": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "technician": [ "name", "startDateTime", "endDateTime", "pointOfCare", "room", "bed", "facility", "locationStatus", "patientLocationType", "building", "floor" ],
    "assistantResultInterpreter": [ "name", "startDateTime", "endDateTime", "pointOfCare", "room", "bed", "facility", "locationStatus", "patientLocationType", "building", "floor" ],
    "principalResultInterpreter": [ "name", "startDateTime", "endDateTime", "pointOfCare", "room", "bed", "facility", "locationStatus", "patientLocationType", "building", "floor" ],
    "reasonForStudy": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "resultCopiesTo": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "parentResult": [ "parentObservationIdentifier", "parentObservationSubIdentifier", "parentObservationValueDescriptor" ],
    "parentObservationIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "chargeToPractice": [ "monetaryAmount", "chargeCode" ],
    "chargeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "monetaryAmount": [ "quantity", "denomination" ],
    "resultsRptStatusChngDateTime": [ "time", "degreeOfPrecision" ],
    "orderCallbackPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "dangerCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "collectorIdentifier": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "collectionVolume": [ "quantity", "units" ],
    "observationEndDateTime": [ "time", "degreeOfPrecision" ],
    "observationDateTime": [ "time", "degreeOfPrecision" ],
    "requestedDateTime": [ "time", "degreeOfPrecision" ],
    "commentType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "statisticsEnd": [ "time", "degreeOfPrecision" ],
    "statisticsStart": [ "time", "degreeOfPrecision" ],
    "newFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "newApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "currentFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "currentApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "bedLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "nextOfKinAssociatedPartysIdentifiers": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "contactPersonsAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "contactPersonsTelephoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "contactPersonsName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "contactReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "organizationNameNk1": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "nextOfKinAssociatedPartiesEmployeeNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "nextOfKinAssociatedPartiesJobCodeClass": [ "jobCode", "jobClass", "jobDescriptionText" ],
    "contactRole": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "businessPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "phoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "relationship": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "notificationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "notificationAlertSeverity": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "notificationDateTime": [ "time", "degreeOfPrecision" ],
    "systemDateTime": [ "time", "degreeOfPrecision" ],
    "messageProfileIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "principalLanguageOfMessage": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "versionId": [ "value", "internationalizationCode", "internationalVersionId" ],
    "internationalVersionId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "internationalizationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "processingId": [ "value", "processingMode" ],
    "messageType": [ "messageCode", "triggerEvent", "messageStructure" ],
    "dateTimeOfMessage": [ "time", "degreeOfPrecision" ],
    "receivingFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "receivingApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "sendingFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "sendingApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "errorCondition": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "priorPatientName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "priorAlternateVisitId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "priorVisitNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "priorPatientId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "priorPatientAccountNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "priorAlternatePatientId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "priorPatientIdentifierList": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "effectiveDateTime": [ "time", "degreeOfPrecision" ],
    "enteredDateTime": [ "time", "degreeOfPrecision" ],
    "masterFileApplicationIdentifier": [ "namespaceId", "universalId", "universalIdType" ],
    "masterFileIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "mfnRecordLevelErrorReturn": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "eventCompletionDateTime": [ "time", "degreeOfPrecision" ],
    "patientLocationRelationshipValue": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "organizationalLocationRelationshipValue": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "locationRelationshipId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "segmentUniqueKey": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "primaryKeyValueLrl": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "licenseNumber": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "locationPhone": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "locationAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "organizationNameLoc": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "primaryKeyValueLoc": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "locationCostCenter": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "contactPhone": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "visitingHours": [ "startDayRange", "endDayRange", "startHourRange", "endHourRange" ],
    "inactivationDateLdp": [ "time", "degreeOfPrecision" ],
    "activationDateLdp": [ "time", "degreeOfPrecision" ],
    "specialtyType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "locationDepartment": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "primaryKeyValueLdp": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "locationCharacteristicValueLch": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "locationCharacteristicId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "primaryKeyValueLch": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "accommodationType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "primaryKeyValueLcc": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "languageProficiencyCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "languageAbilityCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "languageCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "interactionActiveState": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "interactionTypeIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "scheduledProcedureStepLocation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "scheduledStationName": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "protocolCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "modality": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "scheduledProcedureStepId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "studyInstanceUid": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "requestedProcedureId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "targetValue": [ "quantity", "units" ],
    "onBoardStabilityTime": [ "quantity", "units" ],
    "supplierIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "testFluidIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "onBoardStabilityDuration": [ "quantity", "interval", "duration", "startDateTime", "endDateTime", "priority", "condition", "text", "conjunction", "orderSequencing", "occurrenceDuration", "totalOccurrences" ],
    "firstUsedDateTime": [ "time", "degreeOfPrecision" ],
    "expirationDateTime": [ "time", "degreeOfPrecision" ],
    "quantityUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "positionOnCarrier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "containerCarrierIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "inventoryContainerIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "substanceType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "substanceStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "substanceIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "secondOpinionPhysician": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "preCertificationRequirement": [ "certificationPatientType", "certificationRequired", "dateTimeCertificationRequired" ],
    "dateTimeCertificationRequired": [ "time", "degreeOfPrecision" ],
    "certificationAgencyPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "certificationAgency": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "appealReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "certificationContactPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "physicianReviewer": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "nonConcurEffectiveDateTime": [ "time", "degreeOfPrecision" ],
    "nonConcurCodeDescription": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "days": [ "dayType", "numberOfDays" ],
    "operator": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "certificationModifyDateTime": [ "time", "degreeOfPrecision" ],
    "certificationDateTime": [ "time", "degreeOfPrecision" ],
    "penalty": [ "moneyOrPercentageIndicator", "moneyOrPercentageQuantity", "currencyDenomination" ],
    "certifiedBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "certificationNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "cmsPatientSRelationshipToInsured": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "insuredEmployerOrganizationNameAndId": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "insuredOrganizationNameAndId": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "militaryHandicappedProgram": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "insuredsEmployerPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "insuredsPhoneNumberHome": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "guarantorsRelationshipToInsured": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "patientMemberNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "insuranceCoContactPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "insuredsContactPersonPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "insuredsContactPersonsName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "employerContactPersonPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "employerContactPersonName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "dailyDeductible": [ "delayDays", "monetaryAmount", "numberOfDays" ],
    "policyTypeAmount": [ "policyType", "amountClass", "moneyOrPercentageQuantity", "moneyOrPercentage" ],
    "moneyOrPercentage": [ "moneyOrPercentageIndicator", "moneyOrPercentageQuantity", "currencyDenomination" ],
    "roomCoverageTypeAmount": [ "roomType", "amountType", "coverageAmount", "moneyOrPercentage" ],
    "payorSubscriberId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "payorId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "specialCoverageApprovalName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "dependentOfMilitaryRecipient": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "militarySponsorName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "medicaidCaseName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "insuredsEmployersNameAndId": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "insuredsEmployeeId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "insuredsIdNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "insuredsEmployersAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "insuredsEmploymentStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "roomRatePrivate": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "roomRateSemiPrivate": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "policyLimitAmount": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "policyDeductible": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "verificationBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "verificationDateTime": [ "time", "degreeOfPrecision" ],
    "insuredsAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "insuredsDateOfBirth": [ "time", "degreeOfPrecision" ],
    "insuredsRelationshipToPatient": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "nameOfInsured": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "authorizationInformation": [ "authorizationNumber", "date", "source" ],
    "insuredsGroupEmpName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "insuredsGroupEmpId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "groupName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "insuranceCoPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "insuranceCoContactPerson": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "insuranceCompanyAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "insuranceCompanyName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "insuranceCompanyId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "insurancePlanId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "inventoryOnHandQuantityUnit": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "inventoryOnHandDate": [ "time", "degreeOfPrecision" ],
    "inventoryReceivedItemCost": [ "quantity", "denomination" ],
    "inventoryReceivedQuantityUnit": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "inventoryReceivedDate": [ "time", "degreeOfPrecision" ],
    "inventoryLocation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "inventoryManufacturerName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "inventoryExpirationDate": [ "time", "degreeOfPrecision" ],
    "serviceItemCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "primaryKeyValueIim": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "statusedAtDateTime": [ "time", "degreeOfPrecision" ],
    "statusedByOrganization": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "statusedByPerson": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "allergyClinicalStatusCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "alertDeviceCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "relationshipToPatientCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "reportedBy": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "reportedDateTime": [ "time", "degreeOfPrecision" ],
    "allergenGroupCodeMnemonicDescription": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "sensitivityToCausativeAgentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "allergyUniqueIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "allergyActionCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "allergySeverityCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "allergenCodeMnemonicDescription": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "allergenTypeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "guarantorRace": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "guarantorFinancialClass": [ "financialClassCode", "effectiveDate" ],
    "guarantorEmployersOrganizationName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "guarantorMaritalStatusCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "guarantorEmployerIdNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "guarantorHouseholdAnnualIncome": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "guarantorChargeAdjustmentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "guarantorDeathDateAndTime": [ "time", "degreeOfPrecision" ],
    "guarantorCreditRatingCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "guarantorOrganizationName": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "guarantorEmployeeIdNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "guarantorEmployerPhoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "guarantorEmployerAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "guarantorEmployerName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "guarantorRelationship": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "guarantorDateTimeOfBirth": [ "time", "degreeOfPrecision" ],
    "guarantorPhNumBusiness": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "guarantorPhNumHome": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "guarantorAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "guarantorSpouseName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "guarantorName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "guarantorNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "coPayAmount": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "expectedCmsPaymentAmount": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "ambulatoryPaymentClassificationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "charge": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "outlierCost": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "goalTargetName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "goalTargetType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "goalLifeCycleStatusDateTime": [ "time", "degreeOfPrecision" ],
    "goalLifeCycleStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "goalEvaluation": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "goalReviewInterval": [ "quantity", "interval", "duration", "startDateTime", "endDateTime", "priority", "condition", "text", "conjunction", "orderSequencing", "occurrenceDuration", "totalOccurrences" ],
    "previousGoalReviewDateTime": [ "time", "degreeOfPrecision" ],
    "nextGoalReviewDateTime": [ "time", "degreeOfPrecision" ],
    "currentGoalReviewDateTime": [ "time", "degreeOfPrecision" ],
    "currentGoalReviewStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "goalManagementDiscipline": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "goalClassification": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "expectedGoalAchieveDateTime": [ "time", "degreeOfPrecision" ],
    "goalEstablishedDateTime": [ "time", "degreeOfPrecision" ],
    "goalInstanceId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "goalId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "paymentReferenceId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "ndcCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "enteredByCode": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "unitCost": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "orderedByCode": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "performedByCode": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "diagnosisCodeFt1": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "insuranceAmount": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "departmentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "transactionAmountUnit": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "transactionAmountExtended": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "transactionCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "transactionPostingDate": [ "time", "degreeOfPrecision" ],
    "transactionDate": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "fileCreationDateTime": [ "time", "degreeOfPrecision" ],
    "fileReceivingFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "fileReceivingApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "fileSendingFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "fileSendingApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "signatureAuthorityTelecommunication": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "signatureAuthorityAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "signatureAuthority": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "contactTelecommunication": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "contactAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "contactPerson": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "facilityTelecommunication": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "facilityAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "facilityIdFac": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "eventFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "eventOccurred": [ "time", "degreeOfPrecision" ],
    "operatorId": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "dateTimePlannedEvent": [ "time", "degreeOfPrecision" ],
    "recordedDateTime": [ "time", "degreeOfPrecision" ],
    "helpDeskContactPoint": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "overrideReasonCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "overrideType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "applicationErrorCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "hl7ErrorCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "errorLocation": [ "segmentId", "segmentSequence", "fieldPosition", "fieldRepetition", "componentNumber", "subComponentNumber" ],
    "errorCodeAndLocation": [ "segmentId", "segmentSequence", "fieldPosition", "codeIdentifyingError" ],
    "codeIdentifyingError": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "eventIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "alertLevel": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "localRemoteControlState": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "equipmentState": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "eventDateTime": [ "time", "degreeOfPrecision" ],
    "eventType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "eqlQueryName": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "majorFieldOfStudy": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "schoolAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "schoolTypeCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "school": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "academicDegreeProgramParticipationDateRange": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "academicDegreeProgramDateRange": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "dateTimeCompleted": [ "time", "degreeOfPrecision" ],
    "commandResponse": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "requestedCompletionTime": [ "quantity", "interval", "duration", "startDateTime", "endDateTime", "priority", "condition", "text", "conjunction", "orderSequencing", "occurrenceDuration", "totalOccurrences" ],
    "remoteControlCommand": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "outlierReimbursement": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "outlierType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "drgAssignedDateTime": [ "time", "degreeOfPrecision" ],
    "diagnosticRelatedGroup": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "diagnosisIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "attestationDateTime": [ "time", "degreeOfPrecision" ],
    "diagnosingClinician": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "majorDiagnosticCategory": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "diagnosisDateTime": [ "time", "degreeOfPrecision" ],
    "diagnosisCodeDg1": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "disabledPersonIdentifier": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "studyScheduledTimePoint": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "studyPhaseIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "sponsorStudyId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "contactIdentifiers": [ "idNumber", "typeOfIdNumber", "stateOtherQualifyingInformation", "expirationDate" ],
    "contactCommunicationInformation": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "contactLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "contactName": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "studyQualityControlCodes": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "studyScheduledPatientTimePoint": [ "time", "degreeOfPrecision" ],
    "reasonEndedStudy": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeEndedStudy": [ "time", "degreeOfPrecision" ],
    "patientEvaluabilityStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "stratumForStudyRandomization": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "randomizedStudyArm": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "studyRandomizationDateTime": [ "time", "degreeOfPrecision" ],
    "patientStudyEligibilityStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimePatientStudyConsentSigned": [ "time", "degreeOfPrecision" ],
    "studyAuthorizingProvider": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "personPerformingStudyRegistration": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "dateTimeOfPatientStudyRegistration": [ "time", "degreeOfPrecision" ],
    "alternatePatientIdCsr": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "sponsorPatientId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "institutionRegisteringThePatient": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "alternateStudyId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "studyPhaseEvaluability": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dateTimeStudyPhaseEnded": [ "time", "degreeOfPrecision" ],
    "dateTimeStudyPhaseBegan": [ "time", "degreeOfPrecision" ],
    "consenterId": [ "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "nameTypeCode", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix" ],
    "nonSubjectConsenterReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "consentNonDisclosureReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "consentBypassReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "consentEndDateTime": [ "time", "degreeOfPrecision" ],
    "consentEffectiveDateTime": [ "time", "degreeOfPrecision" ],
    "consentDecisionDateTime": [ "time", "degreeOfPrecision" ],
    "consentDiscussionDateTime": [ "time", "degreeOfPrecision" ],
    "consentStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "consentMode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "consentFormNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "consentType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "endingNotificationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "startingNotificationCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "endingNotificationDateTime": [ "time", "degreeOfPrecision" ],
    "startingNotificationDateTime": [ "time", "degreeOfPrecision" ],
    "eventsScheduledThisTimePoint": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "scheduledTimePoint": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "contactsAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "contactsTelephoneNumber": [ "telephoneNumber", "telecommunicationUseCode", "telecommunicationEquipmentType", "emailAddress", "countryCode", "areaCityCode", "localNumber", "extension", "anyText", "extensionPrefix", "speedDialCode", "unformattedTelephoneNumber" ],
    "contactForStudy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "chairmanOfStudy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "certificateStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "revocationReasonCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "revocationDate": [ "time", "degreeOfPrecision" ],
    "renewalDate": [ "time", "degreeOfPrecision" ],
    "inactivationDate": [ "time", "degreeOfPrecision" ],
    "activationDate": [ "time", "degreeOfPrecision" ],
    "issuingDate": [ "time", "degreeOfPrecision" ],
    "grantingDate": [ "time", "degreeOfPrecision" ],
    "jurisdictionBreadth": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "jurisdictionCountyParish": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "jurisdictionStateProvince": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "crlDistributionPoint": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "authorityKeyIdentifier": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "subjectPublicKeyInfo": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "subjectDirectoryAttributeExtension": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "certificateDomain": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "certificateType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "grantingCountyParish": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "grantingStateProvince": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "signatureOfIssuingAuthority": [ "sourceApplication", "typeOfData", "dataSubtype", "encoding", "data" ],
    "sourceApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "issuingAuthority": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "grantingAuthority": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "contractOrganization": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "contractNumber": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "inventoryNumber": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "explodingCharges": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "chargeCodeAlias": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "bpTransfusionInterruptedReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpAdverseReactionType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpTransfusionEndDateTimeOfStatus": [ "time", "degreeOfPrecision" ],
    "bpTransfusionStartDateTimeOfStatus": [ "time", "degreeOfPrecision" ],
    "bpVerifier": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "bpAdministrator": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "bpDateTimeOfStatus": [ "time", "degreeOfPrecision" ],
    "bpTransfusionDispositionStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "cpLotNumber": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "cpManufacturer": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "cpCommercialProduct": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bcBloodGroup": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bcComponent": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bcDonationId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "bpDispensingIndividual": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "bpDispensedToReceiver": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "bpActualDispensedToAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "bpActualDispensedToLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "bpUniqueId": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "bpExpirationDateTime": [ "time", "degreeOfPrecision" ],
    "bcSpecialTesting": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpBloodGroup": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bcDonationTypeIntendedUse": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpDispenseStatus": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpIndicationForUse": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpRequestedDispenseToAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "bpRequestedDispenseToLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "bpRequestedDispenseDateTime": [ "time", "degreeOfPrecision" ],
    "bpIntendedDispenseFromAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "bpIntendedDispenseFromLocation": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "bpIntendedUseDateTime": [ "time", "degreeOfPrecision" ],
    "bpProcessingRequirements": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "bpUniversalServiceId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "chargeTypeReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "accountId": [ "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "effectiveDate", "expirationDate", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "whenToCharge": [ "invocationEvent", "dateTime" ],
    "dateTime": [ "time", "degreeOfPrecision" ],
    "bloodAmount": [ "quantity", "units" ],
    "bloodProductCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "batchCreationDateTime": [ "time", "degreeOfPrecision" ],
    "batchReceivingFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "batchReceivingApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "batchSendingFacility": [ "namespaceId", "universalId", "universalIdType" ],
    "batchSendingApplication": [ "namespaceId", "universalId", "universalIdType" ],
    "reimbursementLimit": [ "price", "priceType", "fromValue", "toValue", "rangeUnits", "rangeType" ],
    "authorizationIdentifier": [ "entityIdentifier", "namespaceId", "universalId", "universalIdType" ],
    "authorizationExpirationDate": [ "time", "degreeOfPrecision" ],
    "authorizationEffectiveDate": [ "time", "degreeOfPrecision" ],
    "authorizingPayorCompanyId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "authorizingPayorPlanId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "repeatingInterval": [ "repeatPattern", "explicitTimeInterval" ],
    "requestedStartDateTimeRange": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "requestEventReason": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "fillerOverrideCriteria": [ "parameterClass", "parameterValue" ],
    "parameterClass": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem", "codingSystemVersionId", "alternateCodingSystemVersionId", "originalText" ],
    "locationSelectionCriteria": [ "parameterClass", "parameterValue" ],
    "resourceSelectionCriteria": [ "parameterClass", "parameterValue" ],
    "timeSelectionCriteria": [ "parameterClass", "parameterValue" ],
    "durationUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "startDateTimeOffsetUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "resourceGroup": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "resourceType": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "personnelResourceId": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "locationGroup": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "locationTypeAil": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "locationResourceId": [ "pointOfCare", "room", "bed", "facility", "locationStatus", "personLocationType", "building", "floor", "locationDescription", "comprehensiveLocationIdentifier", "assigningAuthorityForLocation" ],
    "resourceQuantityUnits": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "resourceId": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "professionalOrganizationAffiliationDateRange": [ "rangeStartDateTime", "rangeEndDateTime" ],
    "professionalOrganizationAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "professionalOrganization": [ "organizationName", "organizationNameTypeCode", "idNumber", "checkDigit", "checkDigitScheme", "assigningAuthority", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "organizationIdentifier" ],
    "accidentAddress": [ "streetAddress", "otherDesignation", "city", "stateOrProvince", "zipOrPostalCode", "country", "addressType", "otherGeographicDesignation", "countyParishCode", "censusTract", "addressRepresentationCode", "addressValidityRange", "effectiveDate", "expirationDate" ],
    "autoAccidentState": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "accidentCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "accidentDateTime": [ "time", "degreeOfPrecision" ],
    "newbornCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "gestationCategoryCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "caseCategoryCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "abstractedBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "abstractCompletionDateTime": [ "time", "degreeOfPrecision" ],
    "triageCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "attestedBy": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    "dateTimeOfAttestation": [ "time", "degreeOfPrecision" ],
    "severityOfIllnessCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "transferMedicalServiceCode": [ "identifier", "text", "nameOfCodingSystem", "alternateIdentifier", "alternateText", "nameOfAlternateCodingSystem" ],
    "dischargeCareProvider": [ "idNumber", "familyName", "givenName", "secondAndFurtherGivenNamesOrInitialsThereof", "suffix", "prefix", "degree", "sourceTable", "assigningAuthority", "nameTypeCode", "identifierCheckDigit", "checkDigitScheme", "identifierTypeCode", "assigningFacility", "nameRepresentationCode", "nameContext", "nameValidityRange", "nameAssemblyOrder", "effectiveDate", "expirationDate", "professionalSuffix", "assigningJurisdiction", "assigningAgencyOrDepartment" ],
    
    "ADR_A19.QUERY_RESPONSE": [ "EVN", "PID", "PD1", "ROL", "NK1", "PV1", "PV2", "ROL", "DB1", "OBX", "AL1", "DG1", "DRG", "adrA19Procedure", "GT1", "adrA19Insurance", "ACC", "UB1", "UB2" ],
    "adrA19Procedure": [ "PR1", "ROL" ],
    "adrA19Insurance": [ "IN1", "IN2", "IN3", "ROL" ],
    "ADT_A01.PROCEDURE": [ "PR1", "ROL" ],
    "ADT_A01.INSURANCE": [ "IN1", "IN2", "IN3", "ROL" ],
    "ADT_A03.PROCEDURE": [ "PR1", "ROL" ],
    "ADT_A03.INSURANCE": [ "IN1", "IN2", "IN3", "ROL" ],
    "ADT_A05.PROCEDURE": [ "PR1", "ROL" ],
    "ADT_A05.INSURANCE": [ "IN1", "IN2", "IN3", "ROL" ],
    "ADT_A06.PROCEDURE": [ "PR1", "ROL" ],
    "ADT_A06.INSURANCE": [ "IN1", "IN2", "IN3", "ROL" ],
    "ADT_A16.PROCEDURE": [ "PR1", "ROL" ],
    "ADT_A16.INSURANCE": [ "IN1", "IN2", "IN3", "ROL" ],
    "ADT_A39.PATIENT": [ "PID", "PD1", "MRG", "PV1" ],
    "ADT_A43.PATIENT": [ "PID", "PD1", "MRG" ],
    "ADT_A45.MERGE_INFO": [ "MRG", "PV1" ],
    "BAR_P01.VISIT": [ "PV1", "PV2", "ROL", "DB1", "OBX", "AL1", "DG1", "DRG", "barP01Procedure", "GT1", "NK1", "barP01Insurance", "ACC", "UB1", "UB2" ],
    "barP01Procedure": [ "PR1", "ROL" ],
    "barP01Insurance": [ "IN1", "IN2", "IN3", "ROL" ],
    "BAR_P02.PATIENT": [ "PID", "PD1", "PV1", "DB1" ],
    "BAR_P05.VISIT": [ "PV1", "PV2", "ROL", "DB1", "OBX", "AL1", "DG1", "DRG", "barP05Procedure", "GT1", "NK1", "barP05Insurance", "ACC", "UB1", "UB2", "ABS", "BLC", "RMI" ],
    "barP05Procedure": [ "PR1", "ROL" ],
    "barP05Insurance": [ "IN1", "IN2", "IN3", "ROL" ],
    "BAR_P06.PATIENT": [ "PID", "PV1" ],
    "BAR_P10.PROCEDURE": [ "PR1", "GP2" ],
    "BAR_P12.PROCEDURE": [ "PR1", "ROL" ],
    "BPS_O29.PATIENT": [ "PID", "PD1", "NTE", "bpsO29PatientVisit" ],
    "bpsO29PatientVisit": [ "PV1", "PV2" ],
    "BPS_O29.ORDER": [ "ORC", "bpsO29Timing", "BPO", "NTE", "bpsO29Product" ],
    "bpsO29Timing": [ "TQ1", "TQ2" ],
    "bpsO29Product": [ "BPX", "NTE" ],
    "BRP_O30.RESPONSE": [ "brpO30Patient" ],
    "brpO30Patient": [ "PID", "brpO30Order" ],
    "brpO30Order": [ "ORC", "brpO30Timing", "BPO", "BPX" ],
    "brpO30Timing": [ "TQ1", "TQ2" ],
    "BRT_O32.RESPONSE": [ "PID", "brtO32Order" ],
    "brtO32Order": [ "ORC", "brtO32Timing", "BPO", "BTX" ],
    "brtO32Timing": [ "TQ1", "TQ2" ],
    "BTS_O31.PATIENT": [ "PID", "PD1", "NTE", "btsO31PatientVisit" ],
    "btsO31PatientVisit": [ "PV1", "PV2" ],
    "BTS_O31.ORDER": [ "ORC", "btsO31Timing", "BPO", "NTE", "btsO31ProductStatus" ],
    "btsO31Timing": [ "TQ1", "TQ2" ],
    "btsO31ProductStatus": [ "BTX", "NTE" ],
    "CRM_C01.PATIENT": [ "PID", "PV1", "CSR", "CSP" ],
    "CSU_C09.PATIENT": [ "PID", "PD1", "NTE", "csuC09Visit", "CSR", "csuC09StudyPhase" ],
    "csuC09Visit": [ "PV1", "PV2" ],
    "csuC09StudyPhase": [ "CSP", "csuC09StudySchedule" ],
    "csuC09StudySchedule": [ "CSS", "csuC09StudyObservation", "csuC09StudyPharm" ],
    "csuC09StudyObservation": [ "ORC", "OBR", "csuC09TimingQty", "OBX" ],
    "csuC09StudyPharm": [ "ORC", "csuC09RxAdmin" ],
    "csuC09RxAdmin": [ "RXA", "RXR" ],
    "csuC09TimingQty": [ "TQ1", "TQ2" ],
    "DFT_P03.COMMON_ORDER": [ "ORC", "dftP03TimingQuantity", "dftP03Order", "dftP03Observation" ],
    "dftP03TimingQuantity": [ "TQ1", "TQ2" ],
    "dftP03Order": [ "OBR", "NTE" ],
    "dftP03Observation": [ "OBX", "NTE" ],
    "DFT_P03.FINANCIAL": [ "FT1", "NTE", "dftP03FinancialProcedure", "dftP03FinancialCommonOrder" ],
    "dftP03FinancialProcedure": [ "PR1", "ROL" ],
    "dftP03FinancialCommonOrder": [ "ORC", "dftP03FinancialTimingQuantity", "dftP03FinancialOrder", "dftP03FinancialObservation" ],
    "DFT_P03.INSURANCE": [ "IN1", "IN2", "IN3", "ROL" ],
    "dftP03FinancialTimingQuantity": [ "TQ1", "TQ2" ],
    "dftP03FinancialOrder": [ "OBR", "NTE" ],
    "dftP03FinancialObservation": [ "OBX", "NTE" ],
    "DFT_P11.COMMON_ORDER": [ "ORC", "dftP11TimingQuantity", "dftP11Order", "dftP11Observation" ],
    "dftP11TimingQuantity": [ "TQ1", "TQ2" ],
    "dftP11Order": [ "OBR", "NTE" ],
    "dftP11Observation": [ "OBX", "NTE" ],
    "DFT_P11.INSURANCE": [ "IN1", "IN2", "IN3", "ROL" ],
    "DFT_P11.FINANCIAL": [ "FT1", "dftP11FinancialProcedure", "dftP11FinancialCommonOrder", "DG1", "DRG", "GT1", "dftP11FinancialInsurance" ],
    "dftP11FinancialProcedure": [ "PR1", "ROL" ],
    "dftP11FinancialCommonOrder": [ "ORC", "dftP11FinancialTimingQuantity", "dftP11FinancialOrder", "dftP11FinancialObservation" ],
    "dftP11FinancialInsurance": [ "IN1", "IN2", "IN3", "ROL" ],
    "dftP11FinancialTimingQuantity": [ "TQ1", "TQ2" ],
    "dftP11FinancialOrder": [ "OBR", "NTE" ],
    "dftP11FinancialObservation": [ "OBX", "NTE" ],
    "DOC_T12.RESULT": [ "EVN", "PID", "PV1", "TXA", "OBX" ],
    "EAC_U07.COMMAND": [ "ECD", "TQ1", "eacU07SpecimenContainer", "CNS" ],
    "eacU07SpecimenContainer": [ "SAC", "SPM" ],
    "EAN_U09.NOTIFICATION": [ "NDS", "NTE" ],
    "EAR_U08.COMMAND_RESPONSE": [ "ECD", "earU08SpecimenContainer", "ECR" ],
    "earU08SpecimenContainer": [ "SAC", "SPM" ],
    "MDM_T01.COMMON_ORDER": [ "ORC", "mdmT01Timing", "OBR", "NTE" ],
    "mdmT01Timing": [ "TQ1", "TQ2" ],
    "MDM_T02.COMMON_ORDER": [ "ORC", "mdmT02Timing", "OBR", "NTE" ],
    "mdmT02Timing": [ "TQ1", "TQ2" ],
    "MDM_T02.OBSERVATION": [ "OBX", "NTE" ],
    "MFN_M01.MF": [ "MFE", "anyHL7Segment" ],
    "MFN_M02.MF_STAFF": [ "MFE", "STF", "PRA", "ORG", "AFF", "LAN", "EDU", "CER", "NTE" ],
    "MFN_M03.MF_TEST": [ "MFE", "OM1", "anyHL7Segment" ],
    "MFN_M04.MF_CDM": [ "MFE", "CDM", "PRC" ],
    "MFN_M05.MF_LOCATION": [ "MFE", "LOC", "LCH", "LRL", "mfnM05MfLocDept" ],
    "mfnM05MfLocDept": [ "LDP", "LCH", "LCC" ],
    "MFN_M06.MF_CLIN_STUDY": [ "MFE", "CM0", "mfnM06MfPhaseSchedDetail" ],
    "mfnM06MfPhaseSchedDetail": [ "CM1", "CM2" ],
    "MFN_M07.MF_CLIN_STUDY_SCHED": [ "MFE", "CM0", "CM2" ],
    "MFN_M08.MF_TEST_NUMERIC": [ "MFE", "OM1", "OM2", "OM3", "OM4" ],
    "MFN_M09.MF_TEST_CATEGORICAL": [ "MFE", "OM1", "mfnM09MfTestCatDetail" ],
    "mfnM09MfTestCatDetail": [ "OM3", "OM4" ],
    "MFN_M10.MF_TEST_BATTERIES": [ "MFE", "OM1", "mfnM10MfTestBattDetail" ],
    "mfnM10MfTestBattDetail": [ "OM5", "OM4" ],
    "MFN_M11.MF_TEST_CALCULATED": [ "MFE", "OM1", "mfnM11MfTestCalcDetail" ],
    "mfnM11MfTestCalcDetail": [ "OM6", "OM2" ],
    "MFN_M12.MF_OBS_ATTRIBUTES": [ "MFE", "OM1", "OM7" ],
    "MFN_M15.MF_INV_ITEM": [ "MFE", "IIM" ],
    "MFN_Znn.MF_SITE_DEFINED": [ "MFE", "anyHL7Segment" ],
    "MFR_M01.MF_QUERY": [ "MFE", "anyHL7Segment" ],
    "MFR_M04.MF_QUERY": [ "MFE", "CDM", "LCH", "PRC" ],
    "MFR_M05.MF_QUERY": [ "MFE", "LOC", "LCH", "LRL", "LDP", "LCH", "LCC" ],
    "MFR_M06.MF_QUERY": [ "MFE", "CM0", "CM1", "CM2" ],
    "MFR_M07.MF_QUERY": [ "MFE", "CM0", "CM2" ],
    "NMD_N02.CLOCK_AND_STATS_WITH_NOTES": [ "nmdN02Clock", "nmdN02AppStats", "nmdN02AppStatus" ],
    "nmdN02Clock": [ "NCK", "NTE" ],
    "nmdN02AppStats": [ "NST", "NTE" ],
    "nmdN02AppStatus": [ "NSC", "NTE" ],
    "NMQ_N01.QRY_WITH_DETAIL": [ "QRD", "QRF" ],
    "NMQ_N01.CLOCK_AND_STATISTICS": [ "NCK", "NST", "NSC" ],
    "NMR_N01.CLOCK_AND_STATS_WITH_NOTES_ALT": [ "NCK", "NTE", "NST", "NTE", "NSC", "NTE" ],
    "OMB_O27.PATIENT": [ "PID", "PD1", "NTE", "ombO27PatientVisit", "ombO27Insurance", "GT1", "AL1" ],
    "ombO27PatientVisit": [ "PV1", "PV2" ],
    "ombO27Insurance": [ "IN1", "IN2", "IN3" ],
    "OMB_O27.ORDER": [ "ORC", "ombO27Timing", "BPO", "SPM", "NTE", "DG1", "ombO27Observation", "FT1", "BLG" ],
    "ombO27Timing": [ "TQ1", "TQ2" ],
    "ombO27Observation": [ "OBX", "NTE" ],
    "OMD_O03.PATIENT": [ "PID", "PD1", "NTE", "omdO03PatientVisit", "omdO03Insurance", "GT1", "AL1" ],
    "omdO03PatientVisit": [ "PV1", "PV2" ],
    "omdO03Insurance": [ "IN1", "IN2", "IN3" ],
    "OMD_O03.ORDER_DIET": [ "ORC", "omdO03TimingDiet", "omdO03Diet" ],
    "omdO03TimingDiet": [ "TQ1", "TQ2" ],
    "omdO03Diet": [ "ODS", "NTE", "omdO03Observation" ],
    "OMD_O03.ORDER_TRAY": [ "ORC", "omdO03TimingTray", "ODT", "NTE" ],
    "omdO03TimingTray": [ "TQ1", "TQ2" ],
    "omdO03Observation": [ "OBX", "NTE" ],
    "OMG_O19.PATIENT": [ "PID", "PD1", "NTE", "NK1", "omgO19PatientVisit", "omgO19Insurance", "GT1", "AL1" ],
    "omgO19PatientVisit": [ "PV1", "PV2" ],
    "omgO19Insurance": [ "IN1", "IN2", "IN3" ],
    "OMG_O19.ORDER": [ "ORC", "omgO19Timing", "OBR", "NTE", "CTD", "DG1", "omgO19Observation", "omgO19Specimen", "omgO19PriorResult", "FT1", "CTI", "BLG" ],
    "omgO19Timing": [ "TQ1", "TQ2" ],
    "omgO19Observation": [ "OBX", "NTE" ],
    "omgO19Specimen": [ "SPM", "OBX", "omgO19Container" ],
    "omgO19PriorResult": [ "omgO19PatientPrior", "omgO19PatientVisitPrior", "AL1", "omgO19OrderPrior" ],
    "omgO19PatientPrior": [ "PID", "PD1" ],
    "omgO19PatientVisitPrior": [ "PV1", "PV2" ],
    "omgO19OrderPrior": [ "ORC", "OBR", "omgO19TimingPrior", "NTE", "CTD", "omgO19ObservationPrior" ],
    "omgO19TimingPrior": [ "TQ1", "TQ2" ],
    "omgO19ObservationPrior": [ "OBX", "NTE" ],
    "omgO19Container": [ "SAC", "OBX" ],
    "OMI_O23.PATIENT": [ "PID", "PD1", "NTE", "omiO23PatientVisit", "omiO23Insurance", "GT1", "AL1" ],
    "omiO23PatientVisit": [ "PV1", "PV2" ],
    "omiO23Insurance": [ "IN1", "IN2", "IN3" ],
    "OMI_O23.ORDER": [ "ORC", "omiO23Timing", "OBR", "NTE", "CTD", "DG1", "omiO23Observation", "IPC" ],
    "omiO23Timing": [ "TQ1", "TQ2" ],
    "omiO23Observation": [ "OBX", "NTE" ],
    "OML_O21.PATIENT": [ "PID", "PD1", "NTE", "NK1", "omlO21PatientVisit", "omlO21Insurance", "GT1", "AL1" ],
    "omlO21PatientVisit": [ "PV1", "PV2" ],
    "omlO21Insurance": [ "IN1", "IN2", "IN3" ],
    "OML_O21.ORDER": [ "ORC", "omlO21Tiiming", "omlO21ObservationRequest", "FT1", "CTI", "BLG" ],
    "omlO21Tiiming": [ "TQ1", "TQ2" ],
    "omlO21ObservationRequest": [ "OBR", "TCD", "NTE", "CTD", "DG1", "omlO21Observation", "omlO21Specimen", "omlO21PriorResult" ],
    "omlO21Observation": [ "OBX", "TCD", "NTE" ],
    "omlO21Specimen": [ "SPM", "OBX", "omlO21Container" ],
    "omlO21PriorResult": [ "omlO21PatientPrior", "omlO21PatientVisitPrior", "AL1", "omlO21OrderPrior" ],
    "omlO21PatientPrior": [ "PID", "PD1" ],
    "omlO21PatientVisitPrior": [ "PV1", "PV2" ],
    "omlO21OrderPrior": [ "ORC", "OBR", "NTE", "omlO21TimingPrior", "omlO21ObservationPrior" ],
    "omlO21TimingPrior": [ "TQ1", "TQ2" ],
    "omlO21ObservationPrior": [ "OBX", "NTE" ],
    "omlO21Container": [ "SAC", "OBX" ],
    "OML_O33.PATIENT": [ "PID", "PD1", "NTE", "NK1", "omlO33PatientVisit", "omlO33Insurance", "GT1", "AL1" ],
    "omlO33PatientVisit": [ "PV1", "PV2" ],
    "omlO33Insurance": [ "IN1", "IN2", "IN3" ],
    "OML_O33.SPECIMEN": [ "SPM", "OBX", "SAC", "omlO33Order" ],
    "omlO33Order": [ "ORC", "omlO33Tiiming", "omlO33ObservationRequest", "FT1", "CTI", "BLG" ],
    "omlO33Tiiming": [ "TQ1", "TQ2" ],
    "omlO33ObservationRequest": [ "OBR", "TCD", "NTE", "DG1", "omlO33Observation", "omlO33PriorResult" ],
    "omlO33Observation": [ "OBX", "TCD", "NTE" ],
    "omlO33PriorResult": [ "omlO33PatientPrior", "omlO33PatientVisitPrior", "AL1", "omlO33OrderPrior" ],
    "omlO33PatientPrior": [ "PID", "PD1" ],
    "omlO33PatientVisitPrior": [ "PV1", "PV2" ],
    "omlO33OrderPrior": [ "ORC", "OBR", "NTE", "omlO33TimingPrior", "omlO33ObservationPrior" ],
    "omlO33TimingPrior": [ "TQ1", "TQ2" ],
    "omlO33ObservationPrior": [ "OBX", "NTE" ],
    "OML_O35.PATIENT": [ "PID", "PD1", "NTE", "NK1", "omlO35PatientVisit", "omlO35Insurance", "GT1", "AL1" ],
    "omlO35PatientVisit": [ "PV1", "PV2" ],
    "omlO35Insurance": [ "IN1", "IN2", "IN3" ],
    "OML_O35.SPECIMEN": [ "SPM", "OBX", "omlO35SpecimenContainer" ],
    "omlO35SpecimenContainer": [ "SAC", "omlO35Order" ],
    "omlO35Order": [ "ORC", "omlO35Tiiming", "omlO35ObservationRequest", "FT1", "CTI", "BLG" ],
    "omlO35Tiiming": [ "TQ1", "TQ2" ],
    "omlO35ObservationRequest": [ "OBR", "TCD", "NTE", "DG1", "omlO35Observation", "omlO35PriorResult" ],
    "omlO35Observation": [ "OBX", "TCD", "NTE" ],
    "omlO35PriorResult": [ "omlO35PatientPrior", "omlO35PatientVisitPrior", "AL1", "omlO35OrderPrior" ],
    "omlO35PatientPrior": [ "PID", "PD1" ],
    "omlO35PatientVisitPrior": [ "PV1", "PV2" ],
    "omlO35OrderPrior": [ "ORC", "OBR", "NTE", "omlO35TimingPrior", "omlO35ObservationPrior" ],
    "omlO35TimingPrior": [ "TQ1", "TQ2" ],
    "omlO35ObservationPrior": [ "OBX", "NTE" ],
    "OMN_O07.PATIENT": [ "PID", "PD1", "NTE", "omnO07PatientVisit", "omnO07Insurance", "GT1", "AL1" ],
    "omnO07PatientVisit": [ "PV1", "PV2" ],
    "omnO07Insurance": [ "IN1", "IN2", "IN3" ],
    "OMN_O07.ORDER": [ "ORC", "omnO07Timing", "RQD", "RQ1", "NTE", "omnO07Observation", "BLG" ],
    "omnO07Timing": [ "TQ1", "TQ2" ],
    "omnO07Observation": [ "OBX", "NTE" ],
    "OMP_O09.PATIENT": [ "PID", "PD1", "NTE", "ompO09PatientVisit", "ompO09Insurance", "GT1", "AL1" ],
    "ompO09PatientVisit": [ "PV1", "PV2" ],
    "ompO09Insurance": [ "IN1", "IN2", "IN3" ],
    "OMP_O09.ORDER": [ "ORC", "ompO09Timing", "RXO", "NTE", "RXR", "ompO09Component", "ompO09Observation", "FT1", "BLG" ],
    "ompO09Timing": [ "TQ1", "TQ2" ],
    "ompO09Component": [ "RXC", "NTE" ],
    "ompO09Observation": [ "OBX", "NTE" ],
    "OMS_O05.PATIENT": [ "PID", "PD1", "NTE", "omsO05PatientVisit", "omsO05Insurance", "GT1", "AL1" ],
    "omsO05PatientVisit": [ "PV1", "PV2" ],
    "omsO05Insurance": [ "IN1", "IN2", "IN3" ],
    "OMS_O05.ORDER": [ "ORC", "omsO05Timing", "RQD", "RQ1", "NTE", "omsO05Observation", "BLG" ],
    "omsO05Timing": [ "TQ1", "TQ2" ],
    "omsO05Observation": [ "OBX", "NTE" ],
    "ORB_O28.RESPONSE": [ "orbO28Patient" ],
    "orbO28Patient": [ "PID", "orbO28Order" ],
    "orbO28Order": [ "ORC", "orbO28Timing", "BPO" ],
    "orbO28Timing": [ "TQ1", "TQ2" ],
    "ORD_O04.RESPONSE": [ "ordO04Patient", "ordO04OrderDiet", "ordO04OrderTray" ],
    "ordO04Patient": [ "PID", "NTE" ],
    "ordO04OrderDiet": [ "ORC", "ordO04TimingDiet", "ODS", "NTE" ],
    "ordO04OrderTray": [ "ORC", "ordO04TimingTray", "ODT", "NTE" ],
    "ordO04TimingTray": [ "TQ1", "TQ2" ],
    "ordO04TimingDiet": [ "TQ1", "TQ2" ],
    "ORF_R04.QUERY_RESPONSE": [ "orfR04Patient", "orfR04Order" ],
    "orfR04Patient": [ "PID", "NTE" ],
    "orfR04Order": [ "ORC", "OBR", "NTE", "orfR04TimingQty", "CTD", "orfR04Observation", "CTI" ],
    "orfR04TimingQty": [ "TQ1", "TQ2" ],
    "orfR04Observation": [ "OBX", "NTE" ],
    "ORG_O20.RESPONSE": [ "orgO20Patient", "orgO20Order" ],
    "orgO20Patient": [ "PID", "NTE" ],
    "orgO20Order": [ "ORC", "orgO20Timing", "OBR", "NTE", "CTI", "orgO20Specimen" ],
    "orgO20Timing": [ "TQ1", "TQ2" ],
    "orgO20Specimen": [ "SPM", "SAC" ],
    "ORI_O24.RESPONSE": [ "oriO24Patient", "oriO24Order" ],
    "oriO24Patient": [ "PID", "NTE" ],
    "oriO24Order": [ "ORC", "oriO24Timing", "OBR", "NTE", "IPC" ],
    "oriO24Timing": [ "TQ1", "TQ2" ],
    "ORL_O22.RESPONSE": [ "orlO22Patient" ],
    "orlO22Patient": [ "PID", "orlO22Order" ],
    "orlO22Order": [ "ORC", "orlO22Timing", "orlO22ObservationRequest" ],
    "orlO22Timing": [ "TQ1", "TQ2" ],
    "orlO22ObservationRequest": [ "OBR", "orlO22Specimen" ],
    "orlO22Specimen": [ "SPM", "SAC" ],
    "ORL_O34.RESPONSE": [ "orlO34Patient" ],
    "orlO34Patient": [ "PID", "orlO34Specimen" ],
    "orlO34Specimen": [ "SPM", "OBX", "SAC", "orlO34Order" ],
    "orlO34Order": [ "ORC", "orlO34Timing", "orlO34ObservationRequest" ],
    "orlO34Timing": [ "TQ1", "TQ2" ],
    "orlO34ObservationRequest": [ "OBR", "orlO34SpmsacSuppgrp2" ],
    "orlO34SpmsacSuppgrp2": [ "SPM", "SAC" ],
    "ORL_O36.RESPONSE": [ "orlO36Patient" ],
    "orlO36Patient": [ "PID", "orlO36Specimen" ],
    "orlO36Specimen": [ "SPM", "OBX", "orlO36SpecimenContainer" ],
    "orlO36SpecimenContainer": [ "SAC", "orlO36Order" ],
    "orlO36Order": [ "ORC", "orlO36Timing", "orlO36ObservationRequest" ],
    "orlO36Timing": [ "TQ1", "TQ2" ],
    "orlO36ObservationRequest": [ "OBR" ],
    "ORM_O01.PATIENT": [ "PID", "PD1", "NTE", "ormO01PatientVisit", "ormO01Insurance", "GT1", "AL1" ],
    "ormO01PatientVisit": [ "PV1", "PV2" ],
    "ormO01Insurance": [ "IN1", "IN2", "IN3" ],
    "ORM_O01.ORDER": [ "ORC", "ormO01OrderDetail", "FT1", "CTI", "BLG" ],
    "ormO01OrderDetail": [ "ormO01Obrrqdrq1RxoodsodtSuppgrp", "NTE", "CTD", "DG1", "ormO01Observation" ],
    "ormO01Obrrqdrq1RxoodsodtSuppgrp": [ "OBR", "RQD", "RQ1", "RXO", "ODS", "ODT" ],
    "ormO01Observation": [ "OBX", "NTE" ],
    "ORN_O08.RESPONSE": [ "ornO08Patient", "ornO08Order" ],
    "ornO08Patient": [ "PID", "NTE" ],
    "ornO08Order": [ "ORC", "ornO08Timing", "RQD", "RQ1", "NTE" ],
    "ornO08Timing": [ "TQ1", "TQ2" ],
    "ORP_O10.RESPONSE": [ "orpO10Patient", "orpO10Order" ],
    "orpO10Patient": [ "PID", "NTE" ],
    "orpO10Order": [ "ORC", "orpO10Timing", "orpO10OrderDetail" ],
    "orpO10Timing": [ "TQ1", "TQ2" ],
    "orpO10OrderDetail": [ "RXO", "NTE", "RXR", "orpO10Component" ],
    "orpO10Component": [ "RXC", "NTE" ],
    "ORR_O02.RESPONSE": [ "orrO02Patient", "orrO02Order" ],
    "orrO02Patient": [ "PID", "NTE" ],
    "orrO02Order": [ "ORC", "orrO02Choice", "NTE", "CTI" ],
    "orrO02Choice": [ "OBR", "RQD", "RQ1", "RXO", "ODS", "ODT" ],
    "ORS_O06.RESPONSE": [ "orsO06Patient", "orsO06Order" ],
    "orsO06Patient": [ "PID", "NTE" ],
    "orsO06Order": [ "ORC", "orsO06Timing", "RQD", "RQ1", "NTE" ],
    "orsO06Timing": [ "TQ1", "TQ2" ],
    "ORU_R01.PATIENT_RESULT": [ "oruR01Patient", "oruR01OrderObservation" ],
    "oruR01Patient": [ "PID", "PD1", "NTE", "NK1", "oruR01Visit" ],
    "oruR01OrderObservation": [ "ORC", "OBR", "NTE", "oruR01TimingQty", "CTD", "oruR01Observation", "FT1", "CTI", "oruR01Specimen" ],
    "oruR01TimingQty": [ "TQ1", "TQ2" ],
    "oruR01Observation": [ "OBX", "NTE" ],
    "oruR01Specimen": [ "SPM", "OBX" ],
    "oruR01Visit": [ "PV1", "PV2" ],
    "ORU_R30.VISIT": [ "PV1", "PV2" ],
    "ORU_R30.TIMING_QTY": [ "TQ1", "TQ2" ],
    "ORU_R30.OBSERVATION": [ "OBX", "NTE" ],
    "OSR_Q06.RESPONSE": [ "osrQ06Patient", "osrQ06Order" ],
    "osrQ06Patient": [ "PID", "NTE" ],
    "osrQ06Order": [ "ORC", "osrQ06Timing", "osrQ06Choice", "NTE", "CTI" ],
    "osrQ06Timing": [ "TQ1", "TQ2" ],
    "osrQ06Choice": [ "OBR", "RQD", "RQ1", "RXO", "ODS", "ODT" ],
    "OUL_R21.PATIENT": [ "PID", "PD1", "NTE" ],
    "OUL_R21.VISIT": [ "PV1", "PV2" ],
    "OUL_R21.ORDER_OBSERVATION": [ "oulR21Container", "ORC", "OBR", "NTE", "oulR21TimingQty", "oulR21Observation", "CTI" ],
    "oulR21Container": [ "SAC", "SID" ],
    "oulR21TimingQty": [ "TQ1", "TQ2" ],
    "oulR21Observation": [ "OBX", "TCD", "SID", "NTE" ],
    "OUL_R22.PATIENT": [ "PID", "PD1", "NTE" ],
    "OUL_R22.VISIT": [ "PV1", "PV2" ],
    "OUL_R22.SPECIMEN": [ "SPM", "OBX", "oulR22Container", "oulR22Order" ],
    "oulR22Container": [ "SAC", "INV" ],
    "oulR22Order": [ "OBR", "ORC", "NTE", "oulR22TimingQty", "oulR22Result", "CTI" ],
    "oulR22TimingQty": [ "TQ1", "TQ2" ],
    "oulR22Result": [ "OBX", "TCD", "SID", "NTE" ],
    "OUL_R23.PATIENT": [ "PID", "PD1", "NTE" ],
    "OUL_R23.VISIT": [ "PV1", "PV2" ],
    "OUL_R23.SPECIMEN": [ "SPM", "OBX", "oulR23Container" ],
    "oulR23Container": [ "SAC", "INV", "oulR23Order" ],
    "oulR23Order": [ "OBR", "ORC", "NTE", "oulR23TimingQty", "oulR23Result", "CTI" ],
    "oulR23TimingQty": [ "TQ1", "TQ2" ],
    "oulR23Result": [ "OBX", "TCD", "SID", "NTE" ],
    "OUL_R24.PATIENT": [ "PID", "PD1", "NTE" ],
    "OUL_R24.VISIT": [ "PV1", "PV2" ],
    "OUL_R24.ORDER": [ "OBR", "ORC", "NTE", "oulR24TimingQty", "oulR24Specimen", "oulR24Result", "CTI" ],
    "oulR24TimingQty": [ "TQ1", "TQ2" ],
    "oulR24Specimen": [ "SPM", "OBX", "oulR24Container" ],
    "oulR24Result": [ "OBX", "TCD", "SID", "NTE" ],
    "oulR24Container": [ "SAC", "INV" ],
    "PEX_P07.VISIT": [ "PV1", "PV2" ],
    "PEX_P07.EXPERIENCE": [ "PES", "pexP07PexObservation" ],
    "pexP07PexObservation": [ "PEO", "pexP07PexCause" ],
    "pexP07PexCause": [ "PCR", "pexP07RxOrder", "pexP07RxAdministration", "PRB", "OBX", "NTE", "pexP07AssociatedPerson", "pexP07Study" ],
    "pexP07RxOrder": [ "RXE", "pexP07TimingQty", "RXR" ],
    "pexP07RxAdministration": [ "RXA", "RXR" ],
    "pexP07AssociatedPerson": [ "NK1", "pexP07AssociatedRxOrder", "pexP07AssociatedRxAdmin", "PRB", "OBX" ],
    "pexP07Study": [ "CSR", "CSP" ],
    "pexP07AssociatedRxOrder": [ "RXE", "pexP07Nk1TimingQty", "RXR" ],
    "pexP07AssociatedRxAdmin": [ "RXA", "RXR" ],
    "pexP07Nk1TimingQty": [ "TQ1", "TQ2" ],
    "pexP07TimingQty": [ "TQ1", "TQ2" ],
    "PGL_PC6.PATIENT_VISIT": [ "PV1", "PV2" ],
    "PGL_PC6.GOAL": [ "GOL", "NTE", "VAR", "pglPc6GoalRole", "pglPc6Pathway", "pglPc6Observation", "pglPc6Problem", "pglPc6Order" ],
    "pglPc6GoalRole": [ "ROL", "VAR" ],
    "pglPc6Pathway": [ "PTH", "VAR" ],
    "pglPc6Observation": [ "OBX", "NTE" ],
    "pglPc6Problem": [ "PRB", "NTE", "VAR", "pglPc6ProblemRole", "pglPc6ProblemObservation" ],
    "pglPc6Order": [ "ORC", "pglPc6OrderDetail" ],
    "pglPc6OrderDetail": [ "pglPc6Choice", "NTE", "VAR", "pglPc6OrderObservation" ],
    "pglPc6Choice": [ "OBR", "anyHL7Segment" ],
    "pglPc6OrderObservation": [ "OBX", "NTE", "VAR" ],
    "pglPc6ProblemRole": [ "ROL", "VAR" ],
    "pglPc6ProblemObservation": [ "OBX", "NTE" ],
    "PMU_B07.CERTIFICATE": [ "CER", "ROL" ],
    "PPG_PCG.PATIENT_VISIT": [ "PV1", "PV2" ],
    "PPG_PCG.PATHWAY": [ "PTH", "NTE", "VAR", "ppgPcgPathwayRole", "ppgPcgGoal" ],
    "ppgPcgPathwayRole": [ "ROL", "VAR" ],
    "ppgPcgGoal": [ "GOL", "NTE", "VAR", "ppgPcgGoalRole", "ppgPcgGoalObservation", "ppgPcgProblem", "ppgPcgOrder" ],
    "ppgPcgGoalRole": [ "ROL", "VAR" ],
    "ppgPcgGoalObservation": [ "OBX", "NTE" ],
    "ppgPcgProblem": [ "PRB", "NTE", "VAR", "ppgPcgProblemRole", "ppgPcgProblemObservation" ],
    "ppgPcgOrder": [ "ORC", "ppgPcgOrderDetail" ],
    "ppgPcgOrderDetail": [ "ppgPcgChoice", "NTE", "VAR", "ppgPcgOrderObservation" ],
    "ppgPcgChoice": [ "OBR", "anyHL7Segment" ],
    "ppgPcgOrderObservation": [ "OBX", "NTE", "VAR" ],
    "ppgPcgProblemRole": [ "ROL", "VAR" ],
    "ppgPcgProblemObservation": [ "OBX", "NTE" ],
    "PPP_PCB.PATIENT_VISIT": [ "PV1", "PV2" ],
    "PPP_PCB.PATHWAY": [ "PTH", "NTE", "VAR", "pppPcbPathwayRole", "pppPcbProblem" ],
    "pppPcbPathwayRole": [ "ROL", "VAR" ],
    "pppPcbProblem": [ "PRB", "NTE", "VAR", "pppPcbProblemRole", "pppPcbProblemObservation", "pppPcbGoal", "pppPcbOrder" ],
    "pppPcbProblemRole": [ "ROL", "VAR" ],
    "pppPcbProblemObservation": [ "OBX", "NTE" ],
    "pppPcbGoal": [ "GOL", "NTE", "VAR", "pppPcbGoalRole", "pppPcbGoalObservation" ],
    "pppPcbOrder": [ "ORC", "pppPcbOrderDetail" ],
    "pppPcbOrderDetail": [ "pppPcbChoice", "NTE", "VAR", "pppPcbOrderObservation" ],
    "pppPcbChoice": [ "OBR", "anyHL7Segment" ],
    "pppPcbOrderObservation": [ "OBX", "NTE", "VAR" ],
    "pppPcbGoalRole": [ "ROL", "VAR" ],
    "pppPcbGoalObservation": [ "OBX", "NTE" ],
    "PPR_PC1.PATIENT_VISIT": [ "PV1", "PV2" ],
    "PPR_PC1.PROBLEM": [ "PRB", "NTE", "VAR", "pprPc1ProblemRole", "pprPc1Pathway", "pprPc1ProblemObservation", "pprPc1Goal", "pprPc1Order" ],
    "pprPc1ProblemRole": [ "ROL", "VAR" ],
    "pprPc1Pathway": [ "PTH", "VAR" ],
    "pprPc1ProblemObservation": [ "OBX", "NTE" ],
    "pprPc1Goal": [ "GOL", "NTE", "VAR", "pprPc1GoalRole", "pprPc1GoalObservation" ],
    "pprPc1Order": [ "ORC", "pprPc1OrderDetail" ],
    "pprPc1OrderDetail": [ "pprPc1Choice", "NTE", "VAR", "pprPc1OrderObservation" ],
    "pprPc1Choice": [ "OBR", "anyHL7Segment" ],
    "pprPc1OrderObservation": [ "OBX", "NTE", "VAR" ],
    "pprPc1GoalRole": [ "ROL", "VAR" ],
    "pprPc1GoalObservation": [ "OBX", "NTE" ],
    "PPT_PCL.PATIENT": [ "PID", "pptPclPatientVisit", "pptPclPathway" ],
    "pptPclPatientVisit": [ "PV1", "PV2" ],
    "pptPclPathway": [ "PTH", "NTE", "VAR", "pptPclPathwayRole", "pptPclGoal" ],
    "pptPclPathwayRole": [ "ROL", "VAR" ],
    "pptPclGoal": [ "GOL", "NTE", "VAR", "pptPclGoalRole", "pptPclGoalObservation", "pptPclProblem", "pptPclOrder" ],
    "pptPclGoalRole": [ "ROL", "VAR" ],
    "pptPclGoalObservation": [ "OBX", "NTE" ],
    "pptPclProblem": [ "PRB", "NTE", "VAR", "pptPclProblemRole", "pptPclProblemObservation" ],
    "pptPclOrder": [ "ORC", "pptPclOrderDetail" ],
    "pptPclOrderDetail": [ "pptPclChoice", "NTE", "VAR", "pptPclOrderObservation" ],
    "pptPclChoice": [ "OBR", "anyHL7Segment" ],
    "pptPclOrderObservation": [ "OBX", "NTE", "VAR" ],
    "pptPclProblemRole": [ "ROL", "VAR" ],
    "pptPclProblemObservation": [ "OBX", "NTE" ],
    "PPV_PCA.PATIENT": [ "PID", "ppvPcaPatientVisit", "ppvPcaGoal" ],
    "ppvPcaPatientVisit": [ "PV1", "PV2" ],
    "ppvPcaGoal": [ "GOL", "NTE", "VAR", "ppvPcaGoalRole", "ppvPcaGoalPathway", "ppvPcaGoalObservation", "ppvPcaProblem", "ppvPcaOrder" ],
    "ppvPcaGoalRole": [ "ROL", "VAR" ],
    "ppvPcaGoalPathway": [ "PTH", "VAR" ],
    "ppvPcaGoalObservation": [ "OBX", "NTE" ],
    "ppvPcaProblem": [ "PRB", "NTE", "VAR", "ppvPcaProblemRole", "ppvPcaProblemObservation" ],
    "ppvPcaOrder": [ "ORC", "ppvPcaOrderDetail" ],
    "ppvPcaOrderDetail": [ "ppvPcaObRanyHl7SegmentSuppgrp", "NTE", "VAR", "ppvPcaOrderObservation" ],
    "ppvPcaObRanyHl7SegmentSuppgrp": [ "OBR", "anyHL7Segment" ],
    "ppvPcaOrderObservation": [ "OBX", "NTE", "VAR" ],
    "ppvPcaProblemRole": [ "ROL", "VAR" ],
    "ppvPcaProblemObservation": [ "OBX", "NTE" ],
    "PRR_PC5.PATIENT": [ "PID", "prrPc5PatientVisit", "prrPc5Problem" ],
    "prrPc5PatientVisit": [ "PV1", "PV2" ],
    "prrPc5Problem": [ "PRB", "NTE", "VAR", "prrPc5ProblemRole", "prrPc5ProblemPathway", "prrPc5ProblemObservation", "prrPc5Goal", "prrPc5Order" ],
    "prrPc5ProblemRole": [ "ROL", "VAR" ],
    "prrPc5ProblemPathway": [ "PTH", "VAR" ],
    "prrPc5ProblemObservation": [ "OBX", "NTE" ],
    "prrPc5Goal": [ "GOL", "NTE", "VAR", "prrPc5GoalRole", "prrPc5GoalObservation" ],
    "prrPc5Order": [ "ORC", "prrPc5OrderDetail" ],
    "prrPc5OrderDetail": [ "prrPc5Choice", "NTE", "VAR", "prrPc5OrderObservation" ],
    "prrPc5Choice": [ "OBR", "anyHL7Segment" ],
    "prrPc5OrderObservation": [ "OBX", "NTE", "VAR" ],
    "prrPc5GoalRole": [ "ROL", "VAR" ],
    "prrPc5GoalObservation": [ "OBX", "NTE" ],
    "PTR_PCF.PATIENT": [ "PID", "ptrPcfPatientVisit", "ptrPcfPathway" ],
    "ptrPcfPatientVisit": [ "PV1", "PV2" ],
    "ptrPcfPathway": [ "PTH", "NTE", "VAR", "ptrPcfPathwayRole", "ptrPcfProblem" ],
    "ptrPcfPathwayRole": [ "ROL", "VAR" ],
    "ptrPcfProblem": [ "PRB", "NTE", "VAR", "ptrPcfProblemRole", "ptrPcfProblemObservation", "ptrPcfGoal", "ptrPcfOrder" ],
    "ptrPcfProblemRole": [ "ROL", "VAR" ],
    "ptrPcfProblemObservation": [ "OBX", "NTE" ],
    "ptrPcfGoal": [ "GOL", "NTE", "VAR", "ptrPcfGoalRole", "ptrPcfGoalObservation" ],
    "ptrPcfOrder": [ "ORC", "ptrPcfOrderDetail" ],
    "ptrPcfOrderDetail": [ "ptrPcfChoice", "NTE", "VAR", "ptrPcfOrderObservation" ],
    "ptrPcfChoice": [ "OBR", "anyHL7Segment" ],
    "ptrPcfOrderObservation": [ "OBX", "NTE", "VAR" ],
    "ptrPcfGoalRole": [ "ROL", "VAR" ],
    "ptrPcfGoalObservation": [ "OBX", "NTE" ],
    "QBP_K13.ROW_DEFINITION": [ "RDF", "RDT" ],
    "QVR_Q17.QBP": [ "anyHL7Segment" ],
    "RAR_RAR.DEFINITION": [ "QRD", "QRF", "rarRarPatient", "rarRarOrder" ],
    "rarRarPatient": [ "PID", "NTE" ],
    "rarRarOrder": [ "ORC", "rarRarEncoding", "RXA", "RXR" ],
    "rarRarEncoding": [ "RXE", "RXR", "RXC" ],
    "RAS_O17.PATIENT": [ "PID", "PD1", "NTE", "AL1", "rasO17PatientVisit" ],
    "rasO17PatientVisit": [ "PV1", "PV2" ],
    "RAS_O17.ORDER": [ "ORC", "rasO17Timing", "rasO17OrderDetail", "rasO17Encoding", "rasO17Administration", "CTI" ],
    "rasO17Timing": [ "TQ1", "TQ2" ],
    "rasO17OrderDetail": [ "RXO", "rasO17OrderDetailSupplement" ],
    "rasO17Encoding": [ "RXE", "rasO17TimingEncoded", "RXR", "RXC" ],
    "rasO17Administration": [ "RXA", "RXR", "rasO17Observation" ],
    "rasO17Observation": [ "OBX", "NTE" ],
    "rasO17TimingEncoded": [ "TQ1", "TQ2" ],
    "rasO17OrderDetailSupplement": [ "NTE", "RXR", "rasO17Components" ],
    "rasO17Components": [ "RXC", "NTE" ],
    "RCI_I05.PROVIDER": [ "PRD", "CTD" ],
    "RCI_I05.OBSERVATION": [ "OBR", "NTE", "rciI05Results" ],
    "rciI05Results": [ "OBX", "NTE" ],
    "RCL_I06.PROVIDER": [ "PRD", "CTD" ],
    "RDE_O11.PATIENT": [ "PID", "PD1", "NTE", "rdeO11PatientVisit", "rdeO11Insurance", "GT1", "AL1" ],
    "rdeO11PatientVisit": [ "PV1", "PV2" ],
    "rdeO11Insurance": [ "IN1", "IN2", "IN3" ],
    "RDE_O11.ORDER": [ "ORC", "rdeO11Timing", "rdeO11OrderDetail", "RXE", "NTE", "rdeO11TimingEncoded", "RXR", "RXC", "rdeO11Observation", "FT1", "BLG", "CTI" ],
    "rdeO11Timing": [ "TQ1", "TQ2" ],
    "rdeO11OrderDetail": [ "RXO", "NTE", "RXR", "rdeO11Component" ],
    "rdeO11TimingEncoded": [ "TQ1", "TQ2" ],
    "rdeO11Observation": [ "OBX", "NTE" ],
    "rdeO11Component": [ "RXC", "NTE" ],
    "RDR_RDR.DEFINITION": [ "QRD", "QRF", "rdrRdrPatient", "rdrRdrOrder" ],
    "rdrRdrPatient": [ "PID", "NTE" ],
    "rdrRdrOrder": [ "ORC", "rdrRdrEncoding", "rdrRdrDispense" ],
    "rdrRdrEncoding": [ "RXE", "RXR", "RXC" ],
    "rdrRdrDispense": [ "RXD", "RXR", "RXC" ],
    "RDS_O13.PATIENT": [ "PID", "PD1", "NTE", "AL1", "rdsO13PatientVisit" ],
    "rdsO13PatientVisit": [ "PV1", "PV2" ],
    "RDS_O13.ORDER": [ "ORC", "rdsO13Timing", "rdsO13OrderDetail", "rdsO13Encoding", "RXD", "NTE", "RXR", "RXC", "rdsO13Observation", "FT1" ],
    "rdsO13Timing": [ "TQ1", "TQ2" ],
    "rdsO13OrderDetail": [ "RXO", "rdsO13OrderDetailSupplement" ],
    "rdsO13Encoding": [ "RXE", "NTE", "rdsO13TimingEncoded", "RXR", "RXC" ],
    "rdsO13Observation": [ "OBX", "NTE" ],
    "rdsO13TimingEncoded": [ "TQ1", "TQ2" ],
    "rdsO13OrderDetailSupplement": [ "NTE", "RXR", "rdsO13Component" ],
    "rdsO13Component": [ "RXC", "NTE" ],
    "REF_I12.AUTHORIZATION_CONTACT": [ "AUT", "CTD" ],
    "REF_I12.PROVIDER_CONTACT": [ "PRD", "CTD" ],
    "REF_I12.INSURANCE": [ "IN1", "IN2", "IN3" ],
    "REF_I12.PROCEDURE": [ "PR1", "refI12AutctdSuppgrp2" ],
    "refI12AutctdSuppgrp2": [ "AUT", "CTD" ],
    "REF_I12.OBSERVATION": [ "OBR", "NTE", "refI12ResultsNotes" ],
    "refI12ResultsNotes": [ "OBX", "NTE" ],
    "REF_I12.PATIENT_VISIT": [ "PV1", "PV2" ],
    "RER_RER.DEFINITION": [ "QRD", "QRF", "rerRerPatient", "rerRerOrder" ],
    "rerRerPatient": [ "PID", "NTE" ],
    "rerRerOrder": [ "ORC", "RXE", "RXR", "RXC" ],
    "RGR_RGR.DEFINITION": [ "QRD", "QRF", "rgrRgrPatient", "rgrRgrOrder" ],
    "rgrRgrPatient": [ "PID", "NTE" ],
    "rgrRgrOrder": [ "ORC", "rgrRgrEncoding", "RXG", "RXR", "RXC" ],
    "rgrRgrEncoding": [ "RXE", "RXR", "RXC" ],
    "RGV_O15.PATIENT": [ "PID", "NTE", "AL1", "rgvO15PatientVisit" ],
    "rgvO15PatientVisit": [ "PV1", "PV2" ],
    "RGV_O15.ORDER": [ "ORC", "rgvO15Timing", "rgvO15OrderDetail", "rgvO15Encoding", "rgvO15Give" ],
    "rgvO15Timing": [ "TQ1", "TQ2" ],
    "rgvO15OrderDetail": [ "RXO", "rgvO15OrderDetailSupplement" ],
    "rgvO15Encoding": [ "RXE", "rgvO15TimingEncoded", "RXR", "RXC" ],
    "rgvO15Give": [ "RXG", "rgvO15TimingGive", "RXR", "RXC", "rgvO15Observation" ],
    "rgvO15TimingGive": [ "TQ1", "TQ2" ],
    "rgvO15Observation": [ "OBX", "NTE" ],
    "rgvO15TimingEncoded": [ "TQ1", "TQ2" ],
    "rgvO15OrderDetailSupplement": [ "NTE", "RXR", "rgvO15Components" ],
    "rgvO15Components": [ "RXC", "NTE" ],
    "ROR_ROR.DEFINITION": [ "QRD", "QRF", "rorRorPatient", "rorRorOrder" ],
    "rorRorPatient": [ "PID", "NTE" ],
    "rorRorOrder": [ "ORC", "RXO", "RXR", "RXC" ],
    "RPA_I08.AUTHORIZATION_1": [ "AUT", "CTD" ],
    "RPA_I08.PROVIDER": [ "PRD", "CTD" ],
    "RPA_I08.INSURANCE": [ "IN1", "IN2", "IN3" ],
    "RPA_I08.PROCEDURE": [ "PR1", "rpaI08Authorization2" ],
    "rpaI08Authorization2": [ "AUT", "CTD" ],
    "RPA_I08.OBSERVATION": [ "OBR", "NTE", "rpaI08Results" ],
    "rpaI08Results": [ "OBX", "NTE" ],
    "RPA_I08.VISIT": [ "PV1", "PV2" ],
    "RPI_I01.PROVIDER": [ "PRD", "CTD" ],
    "RPI_I01.GUARANTOR_INSURANCE": [ "GT1", "rpiI01Insurance" ],
    "rpiI01Insurance": [ "IN1", "IN2", "IN3" ],
    "RPI_I04.PROVIDER": [ "PRD", "CTD" ],
    "RPI_I04.GUARANTOR_INSURANCE": [ "GT1", "rpiI04Insurance" ],
    "rpiI04Insurance": [ "IN1", "IN2", "IN3" ],
    "RPL_I02.PROVIDER": [ "PRD", "CTD" ],
    "RPR_I03.PROVIDER": [ "PRD", "CTD" ],
    "RQA_I08.AUTHORIZATION": [ "AUT", "CTD" ],
    "RQA_I08.PROVIDER": [ "PRD", "CTD" ],
    "RQA_I08.GUARANTOR_INSURANCE": [ "GT1", "rqaI08Insurance" ],
    "rqaI08Insurance": [ "IN1", "IN2", "IN3" ],
    "RQA_I08.PROCEDURE": [ "PR1", "rqaI08AutctdSuppgrp2" ],
    "rqaI08AutctdSuppgrp2": [ "AUT", "CTD" ],
    "RQA_I08.OBSERVATION": [ "OBR", "NTE", "rqaI08Results" ],
    "rqaI08Results": [ "OBX", "NTE" ],
    "RQA_I08.VISIT": [ "PV1", "PV2" ],
    "RQC_I05.PROVIDER": [ "PRD", "CTD" ],
    "RQI_I01.PROVIDER": [ "PRD", "CTD" ],
    "RQI_I01.GUARANTOR_INSURANCE": [ "GT1", "rqiI01Insurance" ],
    "rqiI01Insurance": [ "IN1", "IN2", "IN3" ],
    "RQP_I04.PROVIDER": [ "PRD", "CTD" ],
    "RRA_O18.RESPONSE": [ "rraO18Patient", "rraO18Order" ],
    "rraO18Patient": [ "PID", "NTE" ],
    "rraO18Order": [ "ORC", "rraO18Timing", "rraO18Administration" ],
    "rraO18Timing": [ "TQ1", "TQ2" ],
    "rraO18Administration": [ "RXA", "RXR" ],
    "RRD_O14.RESPONSE": [ "rrdO14Patient", "rrdO14Order" ],
    "rrdO14Patient": [ "PID", "NTE" ],
    "rrdO14Order": [ "ORC", "rrdO14Timing", "rrdO14Dispense" ],
    "rrdO14Timing": [ "TQ1", "TQ2" ],
    "rrdO14Dispense": [ "RXD", "NTE", "RXR", "RXC" ],
    "RRE_O12.RESPONSE": [ "rreO12Patient", "rreO12Order" ],
    "rreO12Patient": [ "PID", "NTE" ],
    "rreO12Order": [ "ORC", "rreO12Timing", "rreO12Encoding" ],
    "rreO12Timing": [ "TQ1", "TQ2" ],
    "rreO12Encoding": [ "RXE", "NTE", "rreO12TimingEncoded", "RXR", "RXC" ],
    "rreO12TimingEncoded": [ "TQ1", "TQ2" ],
    "RRG_O16.RESPONSE": [ "rrgO16Patient", "rrgO16Order" ],
    "rrgO16Patient": [ "PID", "NTE" ],
    "rrgO16Order": [ "ORC", "rrgO16Timing", "rrgO16Give" ],
    "rrgO16Timing": [ "TQ1", "TQ2" ],
    "rrgO16Give": [ "RXG", "rrgO16TimingGive", "RXR", "RXC" ],
    "rrgO16TimingGive": [ "TQ1", "TQ2" ],
    "RRI_I12.AUTHORIZATION_CONTACT": [ "AUT", "CTD" ],
    "RRI_I12.PROVIDER_CONTACT": [ "PRD", "CTD" ],
    "RRI_I12.PROCEDURE": [ "PR1", "rriI12AutctdSuppgrp2" ],
    "rriI12AutctdSuppgrp2": [ "AUT", "CTD" ],
    "RRI_I12.OBSERVATION": [ "OBR", "NTE", "rriI12ResultsNotes" ],
    "rriI12ResultsNotes": [ "OBX", "NTE" ],
    "RRI_I12.PATIENT_VISIT": [ "PV1", "PV2" ],
    "RSP_K11.ROW_DEFINITION": [ "RDF", "RDT" ],
    "RSP_K21.QUERY_RESPONSE": [ "PID", "PD1", "NK1", "QRI" ],
    "RSP_K23.QUERY_RESPONSE": [ "PID" ],
    "RSP_K25.STAFF": [ "STF", "PRA", "ORG", "AFF", "LAN", "EDU", "CER" ],
    "RSP_K31.RESPONSE": [ "rspK31Patient", "rspK31Order" ],
    "rspK31Patient": [ "PID", "PD1", "NTE", "AL1", "rspK31PatientVisit" ],
    "rspK31Order": [ "ORC", "rspK31Timing", "rspK31OrderDetail", "rspK31Encoding", "RXD", "RXR", "RXC", "rspK31Observation" ],
    "rspK31Timing": [ "TQ1", "TQ2" ],
    "rspK31OrderDetail": [ "RXO", "NTE", "RXR", "rspK31Components" ],
    "rspK31Encoding": [ "RXE", "rspK31TimingEncoded", "RXR", "RXC" ],
    "rspK31Observation": [ "OBX", "NTE" ],
    "rspK31TimingEncoded": [ "TQ1", "TQ2" ],
    "rspK31Components": [ "RXC", "NTE" ],
    "rspK31PatientVisit": [ "PV1", "PV2" ],
    "RSP_Q11.QUERY_RESULT_CLUSTER": [ "MFE", "LOC", "LCH", "LRL", "rspQ11MfLocDept" ],
    "rspQ11MfLocDept": [ "LDP", "LCH", "LCC" ],
    "RSP_Z82.QUERY_RESPONSE": [ "rspZ82Patient", "rspZ82CommonOrder" ],
    "rspZ82Patient": [ "PID", "PD1", "NTE", "rspZ82Visit" ],
    "rspZ82CommonOrder": [ "ORC", "rspZ82Timing", "rspZ82OrderDetail", "rspZ82EncodedOrder", "RXD", "RXR", "RXC", "rspZ82Observation" ],
    "rspZ82Timing": [ "TQ1", "TQ2" ],
    "rspZ82OrderDetail": [ "RXO", "NTE", "RXR", "rspZ82Treatment" ],
    "rspZ82EncodedOrder": [ "RXE", "rspZ82TimingEncoded", "RXR", "RXC" ],
    "rspZ82Observation": [ "OBX", "NTE" ],
    "rspZ82TimingEncoded": [ "TQ1", "TQ2" ],
    "rspZ82Treatment": [ "RXC", "NTE" ],
    "rspZ82Visit": [ "AL1", "PV1", "PV2" ],
    "RSP_Z86.QUERY_RESPONSE": [ "rspZ86Patient", "rspZ86CommonOrder" ],
    "rspZ86Patient": [ "PID", "PD1", "NTE", "AL1" ],
    "rspZ86CommonOrder": [ "ORC", "rspZ86Timing", "rspZ86OrderDetail", "rspZ86EncodedOrder", "rspZ86Dispense", "rspZ86Give", "rspZ86Administration", "rspZ86Observation" ], "rspZ86Timing": [ "TQ1", "TQ2" ],
    "rspZ86OrderDetail": [ "RXO", "RXR", "RXC" ],
    "rspZ86EncodedOrder": [ "RXE", "rspZ86TimingEncoded", "RXR", "RXC" ],
    "rspZ86Dispense": [ "RXD", "RXR", "RXC" ],
    "rspZ86Give": [ "RXG", "RXR", "RXC" ],
    "rspZ86Administration": [ "RXA", "RXR", "RXC" ],
    "rspZ86Observation": [ "OBX", "NTE" ],
    "rspZ86TimingEncoded": [ "TQ1", "TQ2" ],
    "RSP_Z88.QUERY_RESPONSE": [ "rspZ88Patient", "rspZ88CommonOrder" ],
    "rspZ88Patient": [ "PID", "PD1", "NTE", "rspZ88Allergy" ],
    "rspZ88CommonOrder": [ "ORC", "rspZ88Timing", "rspZ88OrderDetail", "rspZ88OrderEncoded", "RXD", "RXR", "RXC", "rspZ88Observation" ],
    "rspZ88Timing": [ "TQ1", "TQ2" ],
    "rspZ88OrderDetail": [ "RXO", "NTE", "RXR", "rspZ88Component" ],
    "rspZ88OrderEncoded": [ "RXE", "rspZ88TimingEncoded", "RXR", "RXC" ],
    "rspZ88Observation": [ "OBX", "NTE" ],
    "rspZ88TimingEncoded": [ "TQ1", "TQ2" ],
    "rspZ88Component": [ "RXC", "NTE" ],
    "rspZ88Allergy": [ "AL1", "rspZ88Visit" ],
    "rspZ88Visit": [ "PV1", "PV2" ],
    "RSP_Z90.QUERY_RESPONSE": [ "rspZ90Patient", "rspZ90CommonOrder", "rspZ90Specimen" ],
    "rspZ90Patient": [ "PID", "PD1", "NK1", "NTE", "rspZ90Visit" ],
    "rspZ90CommonOrder": [ "ORC", "rspZ90Timing", "OBR", "NTE", "CTD", "rspZ90Observation" ],
    "rspZ90Specimen": [ "SPM", "OBX" ],
    "rspZ90Timing": [ "TQ1", "TQ2" ],
    "rspZ90Observation": [ "OBX", "NTE" ],
    "rspZ90Visit": [ "PV1", "PV2" ],
    "RTB_K13.ROW_DEFINITION": [ "RDF", "RDT" ],
    "RTB_Z74.ROW_DEFINITION": [ "RDF", "RDT" ],
    "SIU_S12.PATIENT": [ "PID", "PD1", "PV1", "PV2", "OBX", "DG1" ],
    "SIU_S12.RESOURCES": [ "RGS", "siuS12Service", "siuS12GeneralResource", "siuS12LocationResource", "siuS12PersonnelResource" ],
    "siuS12Service": [ "AIS", "NTE" ],
    "siuS12GeneralResource": [ "AIG", "NTE" ],
    "siuS12LocationResource": [ "AIL", "NTE" ],
    "siuS12PersonnelResource": [ "AIP", "NTE" ],
    "SQM_S25.REQUEST": [ "ARQ", "APR", "PID", "sqmS25Resources" ],
    "sqmS25Resources": [ "RGS", "sqmS25Service", "sqmS25GeneralResource", "sqmS25PersonnelResource", "sqmS25LocationResource" ],
    "sqmS25Service": [ "AIS", "APR" ],
    "sqmS25GeneralResource": [ "AIG", "APR" ],
    "sqmS25PersonnelResource": [ "AIP", "APR" ],
    "sqmS25LocationResource": [ "AIL", "APR" ],
    "SQR_S25.SCHEDULE": [ "SCH", "TQ1", "NTE", "sqrS25Patient", "sqrS25Resources" ],
    "sqrS25Patient": [ "PID", "PV1", "PV2", "DG1" ],
    "sqrS25Resources": [ "RGS", "sqrS25Service", "sqrS25GeneralResource", "sqrS25PersonnelResource", "sqrS25LocationResource" ],
    "sqrS25Service": [ "AIS", "NTE" ],
    "sqrS25GeneralResource": [ "AIG", "NTE" ],
    "sqrS25PersonnelResource": [ "AIP", "NTE" ],
    "sqrS25LocationResource": [ "AIL", "NTE" ],
    "SRM_S01.PATIENT": [ "PID", "PV1", "PV2", "OBX", "DG1" ],
    "SRM_S01.RESOURCES": [ "RGS", "srmS01Service", "srmS01GeneralResource", "srmS01LocationResource", "srmS01PersonnelResource" ],
    "srmS01Service": [ "AIS", "APR", "NTE" ],
    "srmS01GeneralResource": [ "AIG", "APR", "NTE" ],
    "srmS01LocationResource": [ "AIL", "APR", "NTE" ],
    "srmS01PersonnelResource": [ "AIP", "APR", "NTE" ],
    "SRR_S01.SCHEDULE": [ "SCH", "TQ1", "NTE", "srrS01Patient", "srrS01Resources" ],
    "srrS01Patient": [ "PID", "PV1", "PV2", "DG1" ],
    "srrS01Resources": [ "RGS", "srrS01Service", "srrS01GeneralResource", "srrS01LocationResource", "srrS01PersonnelResource" ],
    "srrS01Service": [ "AIS", "NTE" ],
    "srrS01GeneralResource": [ "AIG", "NTE" ],
    "srrS01LocationResource": [ "AIL", "NTE" ],
    "srrS01PersonnelResource": [ "AIP", "NTE" ],
    "SSR_U04.SPECIMEN_CONTAINER": [ "SAC", "SPM" ],
    "SSU_U03.SPECIMEN_CONTAINER": [ "SAC", "OBX", "ssuU03Specimen" ],
    "ssuU03Specimen": [ "SPM", "OBX" ],
    "SUR_P09.FACILITY": [ "FAC", "surP09Product", "PSH", "surP09FacilityDetail", "ED" ],
    "surP09Product": [ "PSH", "PDC" ],
    "surP09FacilityDetail": [ "FAC", "PDC", "NTE" ],
    "TCU_U10.TEST_CONFIGURATION": [ "SPM", "TCC" ],
    "VXR_V03.PATIENT_VISIT": [ "PV1", "PV2" ],
    "VXR_V03.INSURANCE": [ "IN1", "IN2", "IN3" ],
    "VXR_V03.ORDER": [ "ORC", "vxrV03Timing", "RXA", "RXR", "vxrV03Observation" ],
    "vxrV03Timing": [ "TQ1", "TQ2" ],
    "vxrV03Observation": [ "OBX", "NTE" ],
    "VXU_V04.PATIENT": [ "PV1", "PV2" ],
    "VXU_V04.INSURANCE": [ "IN1", "IN2", "IN3" ],
    "VXU_V04.ORDER": [ "ORC", "vxuV04Timing", "RXA", "RXR", "vxuV04Observation" ],
    "vxuV04Timing": [ "TQ1", "TQ2" ],
    "vxuV04Observation": [ "OBX", "NTE" ],
    "VXX_V02.PATIENT": [ "PID", "NK1" ]
};

var repeatingElements = [ "ADR_A19.INSURANCE", "ADR_A19.PROCEDURE", "ADR_A19.QUERY_RESPONSE", "ADT_A01.INSURANCE", "ADT_A01.PROCEDURE",
  "ADT_A03.INSURANCE", "ADT_A03.PROCEDURE", "ADT_A05.INSURANCE", "ADT_A05.PROCEDURE", "ADT_A06.INSURANCE",
  "ADT_A06.PROCEDURE", "ADT_A16.INSURANCE", "ADT_A16.PROCEDURE", "ADT_A39.PATIENT", "ADT_A43.PATIENT",
  "ADT_A45.MERGE_INFO", "AFF", "AL1", "BAR_P01.INSURANCE", "BAR_P01.PROCEDURE",
  "BAR_P01.VISIT", "BAR_P02.PATIENT", "BAR_P05.INSURANCE", "BAR_P05.PROCEDURE", "BAR_P05.VISIT",
  "BAR_P06.PATIENT", "BAR_P10.PROCEDURE", "BAR_P12.PROCEDURE", "BLC", "BPS_O29.ORDER",
  "BPS_O29.PRODUCT", "BPS_O29.TIMING", "BPX", "BRP_O30.ORDER", "BRP_O30.TIMING",
  "BRT_O32.ORDER", "BRT_O32.TIMING", "BTS_O31.ORDER", "BTS_O31.PRODUCT_STATUS", "BTS_O31.TIMING",
  "BTX", "CER", "CM1", "CM2", "CRM_C01.PATIENT", "CSP", "CSU_C09.PATIENT", "CSU_C09.RX_ADMIN", "CSU_C09.STUDY_OBSERVATION", "CSU_C09.STUDY_PHARM",
  "CSU_C09.STUDY_PHASE", "CSU_C09.STUDY_SCHEDULE", "CSU_C09.TIMING_QTY", "CTD", "CTI",
  "DB1", "DFT_P03.COMMON_ORDER", "DFT_P03.FINANCIAL", "DFT_P03.FINANCIAL_COMMON_ORDER", "DFT_P03.FINANCIAL_OBSERVATION",
  "DFT_P03.FINANCIAL_PROCEDURE", "DFT_P03.FINANCIAL_TIMING_QUANTITY", "DFT_P03.INSURANCE", "DFT_P03.OBSERVATION", "DFT_P03.TIMING_QUANTITY",
  "DFT_P11.COMMON_ORDER", "DFT_P11.FINANCIAL", "DFT_P11.FINANCIAL_COMMON_ORDER", "DFT_P11.FINANCIAL_INSURANCE", "DFT_P11.FINANCIAL_OBSERVATION",
  "DFT_P11.FINANCIAL_PROCEDURE", "DFT_P11.FINANCIAL_TIMING_QUANTITY", "DFT_P11.INSURANCE", "DFT_P11.OBSERVATION", "DFT_P11.TIMING_QUANTITY",
  "DG1", "DOC_T12.RESULT", "DRG", "DSP", "EAC_U07.COMMAND", "EAN_U09.NOTIFICATION", "EAR_U08.COMMAND_RESPONSE", "EDU", "EQP", "ERR",
  "FT1", "GT1", "IAM", "IN3", "INV", "IPC", "ISD", "LAN", "LCC", "LCH",
  "LDP", "LRL", "MDM_T01.COMMON_ORDER", "MDM_T01.TIMING", "MDM_T02.COMMON_ORDER", "MDM_T02.OBSERVATION", "MDM_T02.TIMING", "MFA", "MFE", "MFN_M01.MF",
  "MFN_M02.MF_STAFF", "MFN_M03.MF_TEST", "MFN_M04.MF_CDM", "MFN_M05.MF_LOCATION", "MFN_M05.MF_LOC_DEPT",
  "MFN_M06.MF_CLIN_STUDY", "MFN_M06.MF_PHASE_SCHED_DETAIL", "MFN_M07.MF_CLIN_STUDY_SCHED", "MFN_M08.MF_TEST_NUMERIC", "MFN_M09.MF_TEST_CATEGORICAL",
  "MFN_M10.MF_TEST_BATTERIES", "MFN_M11.MF_TEST_CALCULATED", "MFN_M12.MF_OBS_ATTRIBUTES", "MFN_M15.MF_INV_ITEM", "MFR_M01.MF_QUERY",
  "MFR_M04.MF_QUERY", "MFR_M05.MF_QUERY", "MFR_M06.MF_QUERY", "MFR_M07.MF_QUERY", "NK1",
  "NMD_N02.CLOCK_AND_STATS_WITH_NOTES", "NMQ_N01.CLOCK_AND_STATISTICS", "NMR_N01.CLOCK_AND_STATS_WITH_NOTES_ALT", "NTE", "OBX",
  "ODS", "ODT", "OM4", "OMB_O27.INSURANCE", "OMB_O27.OBSERVATION", "OMB_O27.ORDER", "OMB_O27.TIMING", "OMD_O03.INSURANCE", "OMD_O03.OBSERVATION", "OMD_O03.ORDER_DIET",
  "OMD_O03.ORDER_TRAY", "OMD_O03.TIMING_DIET", "OMD_O03.TIMING_TRAY", "OMG_O19.CONTAINER", "OMG_O19.INSURANCE",
  "OMG_O19.OBSERVATION", "OMG_O19.OBSERVATION_PRIOR", "OMG_O19.ORDER", "OMG_O19.ORDER_PRIOR", "OMG_O19.PRIOR_RESULT",
  "OMG_O19.SPECIMEN", "OMG_O19.TIMING", "OMG_O19.TIMING_PRIOR", "OMI_O23.INSURANCE", "OMI_O23.OBSERVATION",
  "OMI_O23.ORDER", "OMI_O23.TIMING", "OML_O21.CONTAINER", "OML_O21.INSURANCE", "OML_O21.OBSERVATION",
  "OML_O21.OBSERVATION_PRIOR", "OML_O21.ORDER", "OML_O21.ORDER_PRIOR", "OML_O21.PRIOR_RESULT", "OML_O21.SPECIMEN",
  "OML_O21.TIIMING", "OML_O21.TIMING_PRIOR", "OML_O33.INSURANCE", "OML_O33.OBSERVATION", "OML_O33.OBSERVATION_PRIOR",
  "OML_O33.ORDER", "OML_O33.ORDER_PRIOR", "OML_O33.PRIOR_RESULT", "OML_O33.SPECIMEN", "OML_O33.TIIMING",
  "OML_O33.TIMING_PRIOR", "OML_O35.INSURANCE", "OML_O35.OBSERVATION", "OML_O35.OBSERVATION_PRIOR", "OML_O35.ORDER",
  "OML_O35.ORDER_PRIOR", "OML_O35.PRIOR_RESULT", "OML_O35.SPECIMEN", "OML_O35.SPECIMEN_CONTAINER", "OML_O35.TIIMING",
  "OML_O35.TIMING_PRIOR", "OMN_O07.INSURANCE", "OMN_O07.OBSERVATION", "OMN_O07.ORDER", "OMN_O07.TIMING",
  "OMP_O09.COMPONENT", "OMP_O09.INSURANCE", "OMP_O09.OBSERVATION", "OMP_O09.ORDER", "OMP_O09.TIMING",
  "OMS_O05.INSURANCE", "OMS_O05.OBSERVATION", "OMS_O05.ORDER", "OMS_O05.TIMING", "ORB_O28.ORDER",
  "ORB_O28.TIMING", "ORD_O04.ORDER_DIET", "ORD_O04.ORDER_TRAY", "ORD_O04.TIMING_DIET", "ORD_O04.TIMING_TRAY",
  "ORF_R04.OBSERVATION", "ORF_R04.ORDER", "ORF_R04.QUERY_RESPONSE", "ORF_R04.TIMING_QTY", "ORG",
  "ORG_O20.ORDER", "ORG_O20.SPECIMEN", "ORG_O20.TIMING", "ORI_O24.ORDER", "ORI_O24.TIMING",
  "ORL_O22.ORDER", "ORL_O22.SPECIMEN", "ORL_O22.TIMING", "ORL_O34.ORDER", "ORL_O34.SPECIMEN",
  "ORL_O34.SPMSAC_SUPPGRP2", "ORL_O34.TIMING", "ORL_O36.ORDER", "ORL_O36.SPECIMEN", "ORL_O36.SPECIMEN_CONTAINER",
  "ORL_O36.TIMING", "ORM_O01.INSURANCE", "ORM_O01.OBSERVATION", "ORM_O01.ORDER", "ORN_O08.ORDER",
  "ORN_O08.TIMING", "ORP_O10.COMPONENT", "ORP_O10.ORDER", "ORP_O10.TIMING", "ORR_O02.ORDER",
  "ORS_O06.ORDER", "ORS_O06.TIMING", "ORU_R01.OBSERVATION", "ORU_R01.ORDER_OBSERVATION", "ORU_R01.PATIENT_RESULT",
  "ORU_R01.SPECIMEN", "ORU_R01.TIMING_QTY", "ORU_R30.OBSERVATION", "ORU_R30.TIMING_QTY", "OSR_Q06.ORDER",
  "OSR_Q06.TIMING", "OUL_R21.OBSERVATION", "OUL_R21.ORDER_OBSERVATION", "OUL_R21.TIMING_QTY", "OUL_R22.CONTAINER",
  "OUL_R22.ORDER", "OUL_R22.RESULT", "OUL_R22.SPECIMEN", "OUL_R22.TIMING_QTY", "OUL_R23.CONTAINER",
  "OUL_R23.ORDER", "OUL_R23.RESULT", "OUL_R23.SPECIMEN", "OUL_R23.TIMING_QTY", "OUL_R24.CONTAINER",
  "OUL_R24.ORDER", "OUL_R24.RESULT", "OUL_R24.SPECIMEN", "OUL_R24.TIMING_QTY", "PEX_P07.ASSOCIATED_RX_ADMIN",
  "PEX_P07.EXPERIENCE", "PEX_P07.NK1_TIMING_QTY", "PEX_P07.PEX_CAUSE", "PEX_P07.PEX_OBSERVATION", "PEX_P07.RX_ADMINISTRATION",
  "PEX_P07.STUDY", "PEX_P07.TIMING_QTY", "PGL_PC6.GOAL", "PGL_PC6.GOAL_ROLE", "PGL_PC6.OBSERVATION",
  "PGL_PC6.ORDER", "PGL_PC6.ORDER_OBSERVATION", "PGL_PC6.PATHWAY", "PGL_PC6.PROBLEM", "PGL_PC6.PROBLEM_OBSERVATION",
  "PGL_PC6.PROBLEM_ROLE", "PID", "PMU_B07.CERTIFICATE", "PPG_PCG.GOAL", "PPG_PCG.GOAL_OBSERVATION",
  "PPG_PCG.GOAL_ROLE", "PPG_PCG.ORDER", "PPG_PCG.ORDER_OBSERVATION", "PPG_PCG.PATHWAY", "PPG_PCG.PATHWAY_ROLE",
  "PPG_PCG.PROBLEM", "PPG_PCG.PROBLEM_OBSERVATION", "PPG_PCG.PROBLEM_ROLE", "PPP_PCB.GOAL", "PPP_PCB.GOAL_OBSERVATION",
  "PPP_PCB.GOAL_ROLE", "PPP_PCB.ORDER", "PPP_PCB.ORDER_OBSERVATION", "PPP_PCB.PATHWAY", "PPP_PCB.PATHWAY_ROLE",
  "PPP_PCB.PROBLEM", "PPP_PCB.PROBLEM_OBSERVATION", "PPP_PCB.PROBLEM_ROLE", "PPR_PC1.GOAL", "PPR_PC1.GOAL_OBSERVATION",
  "PPR_PC1.GOAL_ROLE", "PPR_PC1.ORDER", "PPR_PC1.ORDER_OBSERVATION", "PPR_PC1.PATHWAY", "PPR_PC1.PROBLEM",
  "PPR_PC1.PROBLEM_OBSERVATION", "PPR_PC1.PROBLEM_ROLE", "PPT_PCL.GOAL", "PPT_PCL.GOAL_OBSERVATION", "PPT_PCL.GOAL_ROLE",
  "PPT_PCL.ORDER", "PPT_PCL.ORDER_OBSERVATION", "PPT_PCL.PATHWAY", "PPT_PCL.PATHWAY_ROLE", "PPT_PCL.PATIENT",
  "PPT_PCL.PROBLEM", "PPT_PCL.PROBLEM_OBSERVATION", "PPT_PCL.PROBLEM_ROLE", "PPV_PCA.GOAL", "PPV_PCA.GOAL_OBSERVATION",
  "PPV_PCA.GOAL_PATHWAY", "PPV_PCA.GOAL_ROLE", "PPV_PCA.ORDER", "PPV_PCA.ORDER_OBSERVATION", "PPV_PCA.PATIENT",
  "PPV_PCA.PROBLEM", "PPV_PCA.PROBLEM_OBSERVATION", "PPV_PCA.PROBLEM_ROLE", "PRA", "PRB",
  "PRC", "PRR_PC5.GOAL", "PRR_PC5.GOAL_OBSERVATION", "PRR_PC5.GOAL_ROLE", "PRR_PC5.ORDER",
  "PRR_PC5.ORDER_OBSERVATION", "PRR_PC5.PATIENT", "PRR_PC5.PROBLEM", "PRR_PC5.PROBLEM_OBSERVATION", "PRR_PC5.PROBLEM_PATHWAY",
  "PRR_PC5.PROBLEM_ROLE", "PTR_PCF.GOAL", "PTR_PCF.GOAL_OBSERVATION", "PTR_PCF.GOAL_ROLE", "PTR_PCF.ORDER",
  "PTR_PCF.ORDER_OBSERVATION", "PTR_PCF.PATHWAY", "PTR_PCF.PATHWAY_ROLE", "PTR_PCF.PATIENT", "PTR_PCF.PROBLEM",
  "PTR_PCF.PROBLEM_OBSERVATION", "PTR_PCF.PROBLEM_ROLE", "RAR_RAR.DEFINITION", "RAR_RAR.ORDER", "RAS_O17.ADMINISTRATION",
  "RAS_O17.COMPONENTS", "RAS_O17.OBSERVATION", "RAS_O17.ORDER", "RAS_O17.TIMING", "RAS_O17.TIMING_ENCODED",
  "RCI_I05.OBSERVATION", "RCI_I05.PROVIDER", "RCI_I05.RESULTS", "RCL_I06.PROVIDER", "RDE_O11.COMPONENT",
  "RDE_O11.INSURANCE", "RDE_O11.OBSERVATION", "RDE_O11.ORDER", "RDE_O11.TIMING", "RDE_O11.TIMING_ENCODED",
  "RDR_RDR.DEFINITION", "RDR_RDR.DISPENSE", "RDR_RDR.ORDER", "RDS_O13.COMPONENT", "RDS_O13.OBSERVATION",
  "RDS_O13.ORDER", "RDS_O13.TIMING", "RDS_O13.TIMING_ENCODED", "RDT", "REF_I12.INSURANCE",
  "REF_I12.OBSERVATION", "REF_I12.PROCEDURE", "REF_I12.PROVIDER_CONTACT", "REF_I12.RESULTS_NOTES", "RER_RER.DEFINITION",
  "RER_RER.ORDER", "RGR_RGR.DEFINITION", "RGR_RGR.ORDER", "RGV_O15.COMPONENTS", "RGV_O15.GIVE",
  "RGV_O15.OBSERVATION", "RGV_O15.ORDER", "RGV_O15.TIMING", "RGV_O15.TIMING_ENCODED", "RGV_O15.TIMING_GIVE",
  "ROL", "ROR_ROR.DEFINITION", "ROR_ROR.ORDER", "RPA_I08.INSURANCE", "RPA_I08.OBSERVATION",
  "RPA_I08.PROCEDURE", "RPA_I08.PROVIDER", "RPA_I08.RESULTS", "RPI_I01.INSURANCE", "RPI_I01.PROVIDER",
  "RPI_I04.INSURANCE", "RPI_I04.PROVIDER", "RPL_I02.PROVIDER", "RPR_I03.PROVIDER", "RQA_I08.INSURANCE",
  "RQA_I08.OBSERVATION", "RQA_I08.PROCEDURE", "RQA_I08.PROVIDER", "RQA_I08.RESULTS", "RQC_I05.PROVIDER",
  "RQI_I01.INSURANCE", "RQI_I01.PROVIDER", "RQP_I04.PROVIDER", "RRA_O18.ORDER", "RRA_O18.TIMING",
  "RRD_O14.ORDER", "RRD_O14.TIMING", "RRE_O12.ORDER", "RRE_O12.TIMING", "RRE_O12.TIMING_ENCODED",
  "RRG_O16.ORDER", "RRG_O16.TIMING", "RRG_O16.TIMING_GIVE", "RRI_I12.OBSERVATION", "RRI_I12.PROCEDURE",
  "RRI_I12.PROVIDER_CONTACT", "RRI_I12.RESULTS_NOTES", "RSP_K21.QUERY_RESPONSE", "RSP_K25.STAFF", "RSP_K31.COMPONENTS",
  "RSP_K31.OBSERVATION", "RSP_K31.ORDER", "RSP_K31.RESPONSE", "RSP_K31.TIMING", "RSP_K31.TIMING_ENCODED",
  "RSP_Q11.MF_LOC_DEPT", "RSP_Z82.COMMON_ORDER", "RSP_Z82.OBSERVATION", "RSP_Z82.QUERY_RESPONSE", "RSP_Z82.TIMING",
  "RSP_Z82.TIMING_ENCODED", "RSP_Z86.COMMON_ORDER", "RSP_Z86.OBSERVATION", "RSP_Z86.QUERY_RESPONSE", "RSP_Z86.TIMING",
  "RSP_Z86.TIMING_ENCODED", "RSP_Z88.COMMON_ORDER", "RSP_Z88.OBSERVATION", "RSP_Z88.QUERY_RESPONSE", "RSP_Z88.TIMING",
  "RSP_Z88.TIMING_ENCODED", "RSP_Z90.COMMON_ORDER", "RSP_Z90.OBSERVATION", "RSP_Z90.QUERY_RESPONSE", "RSP_Z90.SPECIMEN",
  "RSP_Z90.TIMING", "RXA", "RXC", "RXG", "RXR", "SAC", "SFT", "SID", "SIU_S12.GENERAL_RESOURCE", "SIU_S12.LOCATION_RESOURCE",
  "SIU_S12.PATIENT", "SIU_S12.PERSONNEL_RESOURCE", "SIU_S12.RESOURCES", "SIU_S12.SERVICE", "SPM",
  "SQM_S25.GENERAL_RESOURCE", "SQM_S25.LOCATION_RESOURCE", "SQM_S25.PERSONNEL_RESOURCE", "SQM_S25.RESOURCES", "SQM_S25.SERVICE",
  "SQR_S25.GENERAL_RESOURCE", "SQR_S25.LOCATION_RESOURCE", "SQR_S25.PERSONNEL_RESOURCE", "SQR_S25.RESOURCES", "SQR_S25.SCHEDULE",
  "SQR_S25.SERVICE", "SRM_S01.GENERAL_RESOURCE", "SRM_S01.LOCATION_RESOURCE", "SRM_S01.PATIENT", "SRM_S01.PERSONNEL_RESOURCE",
  "SRM_S01.RESOURCES", "SRM_S01.SERVICE", "SRR_S01.GENERAL_RESOURCE", "SRR_S01.LOCATION_RESOURCE", "SRR_S01.PATIENT",
  "SRR_S01.PERSONNEL_RESOURCE", "SRR_S01.RESOURCES", "SRR_S01.SERVICE", "SSR_U04.SPECIMEN_CONTAINER", "SSU_U03.SPECIMEN",
  "SSU_U03.SPECIMEN_CONTAINER", "SUR_P09.FACILITY", "SUR_P09.FACILITY_DETAIL", "SUR_P09.PRODUCT", "TCC",
  "TCU_U10.TEST_CONFIGURATION", "TQ1", "TQ2", "VAR", "VXR_V03.INSURANCE",
  "VXR_V03.OBSERVATION", "VXR_V03.ORDER", "VXR_V03.TIMING", "VXU_V04.INSURANCE", "VXU_V04.OBSERVATION",
  "VXU_V04.ORDER", "VXU_V04.TIMING", "VXX_V02.PATIENT", "abnormalFlags", "accommodationType",
  "actionBy", "actionTakenInResponseToTheEvent", "additive", "administeringProvider", "administrationNotes",
  "allergyReactionCode", "alternatePatientIdPid", "applicationErrorParameter", "appointmentTimingQuantity", "assignedDocumentAuthenticator",
  "assistantResultInterpreter", "authenticationPersonTimeStamp", "backupPersonId", "batchTotals", "bcSpecialTesting",
  "billingCategory", "bpAdverseReactionType", "bpIndicationForUse", "bpProcessingRequirements", "callBackPhoneNumber",
  "causeOfDeath", "characterSet", "chargeCode", "chargeCodeAlias", "citizenship",
  "collectorIdentifier", "collectorsComment", "columnDescription", "commandResponseParameters", "comment",
  "consentBackground", "consentText", "consenterId", "consenterImposedLimitations", "contactAddress",
  "contactCommunicationInformation", "contactIdentifiers", "contactName", "contactPerson", "contactRole",
  "contactTelecommunication", "contactTitle", "contractNumber", "contractOrganization", "costCenterCode",
  "crlDistributionPoint", "dateTimeSelectionQualifier", "deathCauseCode", "department", "dietSupplementOrPreferenceCode",
  "dispenseNotes", "dispensingProvider", "distributedCopies", "drugInterference", "eMailAddress",
  "editDateTime", "enteredBy", "enteredByPerson", "enteredByPhoneNumber", "equipmentInstanceIdentifier",
  "errorCodeAndLocation", "errorLocation", "ethnicGroup", "eventCausalityObservations", "eventDescriptionFromAutopsy",
  "eventDescriptionFromOthers", "eventDescriptionFromPatient", "eventDescriptionFromPractitioner", "eventFromOriginalReporter", "eventIdentifiersUsed",
  "eventLocationOccurredAddress", "eventOutcome", "eventQualification", "eventReportTimingType", "eventReportedTo",
  "eventSymptomDiagnosisCode", "explodingCharges", "facilityAddress", "facilityIdPrc", "fillerContactAddress",
  "fillerContactPerson", "fillerOrderNumber", "fillerOverrideCriteria", "fillerSupplementalServiceInformation", "formula",
  "giveIndication", "goalEvaluationComment", "goalTargetName", "goalTargetType", "governmentReimbursementBillingEligibility",
  "helpDeskContactPoint", "hospitalServiceStf", "identityReliabilityCode", "indication", "indirectExposureMechanism",
  "informPersonIndicator", "inputParameterList", "institutionActivationDate", "institutionInactivationDate", "inventoryNumber",
  "jurisdictionBreadth", "languageAbilityCode", "licenseNumber", "location", "locationAddress",
  "locationEquipment", "locationPhone", "locationResourceId", "locationSelectionCriteria", "locationService",
  "locationTypeLoc", "majorFieldOfStudy", "manufacturerDistributor", "matchReasonCode", "messageProfileIdentifier",
  "modelIdentifier", "mothersIdentifier", "mothersMaidenName", "natureOfAbnormalTest", "numberOfProductExperienceReportsFiledByDistributor",
  "numberOfProductExperienceReportsFiledByFacility", "observationMethod", "observationValue", "officeHomeAddressBirthplace", "operatorId",
  "orderCallbackPhoneNumber", "orderingFacilityAddress", "orderingFacilityName", "orderingFacilityPhoneNumber", "orderingProvider",
  "orderingProviderAddress", "orderingProvidersDeaNumber", "organizationNameLoc", "organizationalLocationRelationshipValue", "originatorCodeName",
  "otherEnvironmentalFactors", "otherIdentifier", "otherQrySubjectFilter", "overrideReasonCode", "parameters",
  "patientAddress", "patientAlias", "patientIdentifierList", "patientName", "personPerformingStudyRegistration",
  "personnelResourceId", "pharmaceuticalSubstanceAlternative", "pharmacistTreatmentSuppliersVerifierId", "pharmacyTreatmentSuppliersSpecialAdministrationInstructions", "pharmacyTreatmentSuppliersSpecialDispensingInstructions",
  "phone", "phoneNumberBusiness", "phoneNumberHome", "placerContactAddress", "placerContactPerson",
  "placerContactPhoneNumber", "placerOrderNumber", "placerSupplementalServiceInformation", "plannedPatientTransportComment", "practitionerCategory",
  "practitionerGroup", "practitionerIdNumbers", "price", "primaryActivityProviderCodeName", "primaryKeyValueMfa",
  "primaryKeyValueMfe", "primaryKeyValueType", "primaryKeyValueTypeMfa", "primaryObserverAddress", "primaryObserverName",
  "primaryObserverTelephone", "priorAlternatePatientId", "priorPatientIdentifierList", "priorPatientName", "privileges",
  "problemManagementDiscipline", "procedureCode", "procedureCodeModifier", "productSerialLotNumber", "professionalOrganizationAffiliationDateRange",
  "protocolCode", "providerAddress", "providerCommunicationInformation", "providerIdentifiers", "providerName",
  "providerRole", "providerType", "providersAdministrationInstructions", "providersPharmacyTreatmentInstructions", "quantityTiming",
  "rUDateTimeSelectionQualifier", "rUDisplayPrintLocations", "rUOtherResultsSubjectDefinition", "rUWhatDepartmentCode", "rUWhatSubjectDefinition",
  "rUWhatUserQualifier", "rUWhereSubjectDefinition", "rUWhichDateTimeQualifier", "rUWhichDateTimeStatusQualifier", "rUWhoSubjectDefinition",
  "race", "randomizedStudyArm", "reasonForStudy", "relationshipToSubjectTable", "requestedStartDateTimeRange",
  "resourceGroup", "resourceSelectionCriteria", "responsibleObserver", "resultCopiesTo", "rolePerson",
  "scheduledProcedureStepLocation", "segmentGroupInclusion", "selectionCriteria", "senderAddress", "senderEventDescription",
  "senderIndividualName", "senderOrganizationName", "senderTelephone", "servicePeriod", "signatureAuthority",
  "signatureAuthorityAddress", "sortByField", "specialHandlingCode", "specialty", "specialtyType",
  "specimenAdditives", "specimenCondition", "specimenDescription", "specimenHandlingCode", "specimenParentIDs",
  "specimenRejectReason", "specimenRiskCode", "specimenRole", "specimenSourceSiteModifier", "specimenTypeModifier",
  "staffIdentifierList", "staffName", "staffType", "stratumForStudyRandomization", "studyAuthorizingProvider",
  "studyQualityControlCodes", "studyRandomizationDateTime", "subjectDirectoryAttributeExtension", "subjectSpecificConsentBackground", "subjectSpecificConsentText",
  "substanceExpirationDate", "substanceLotNumber", "substanceManufacturerName", "substanceStatus", "substanceTreatmentRefusalReason",
  "supplementaryCode", "systemInducedContaminants", "technician", "testFluidIdentifier", "textInstruction",
  "timeSelectionCriteria", "transcriptionist", "transcriptionistCodeName", "transportLogisticsOfCollectedSample", "tribalCitizenship",
  "validPatientClasses", "varianceDescription", "varianceOriginator", "verifiedBy", "visitingHours",
  "whatDataCodeValueQual", "whatDepartmentDataCode", "whatDomainsReturned", "whatSubjectFilter", "whatUserQualifier", "whereSubjectFilter",
  "whichDateTimeQualifier", "whichDateTimeStatusQualifier", "whoSubjectFilter"
];

var optionalElements = {
    "ABS": [
        {
            "name": "dischargeCareProvider",
            "optional": true,
        },
        {
            "name": "transferMedicalServiceCode",
            "optional": true,
        },
        {
            "name": "severityOfIllnessCode",
            "optional": true,
        },
        {
            "name": "dateTimeOfAttestation",
            "optional": true,
        },
        {
            "name": "attestedBy",
            "optional": true,
        },
        {
            "name": "triageCode",
            "optional": true,
        },
        {
            "name": "abstractCompletionDateTime",
            "optional": true,
        },
        {
            "name": "abstractedBy",
            "optional": true,
        },
        {
            "name": "caseCategoryCode",
            "optional": true,
        },
        {
            "name": "caesarianSectionIndicator",
            "optional": true,
        },
        {
            "name": "gestationCategoryCode",
            "optional": true,
        },
        {
            "name": "gestationPeriodWeeks",
            "optional": true,
        },
        {
            "name": "newbornCode",
            "optional": true,
        },
        {
            "name": "stillbornIndicator",
            "optional": true,
        },
    ],
    "ACC": [
        {
            "name": "accidentDateTime",
            "optional": true,
        },
        {
            "name": "accidentCode",
            "optional": true,
        },
        {
            "name": "accidentLocation",
            "optional": true,
        },
        {
            "name": "autoAccidentState",
            "optional": true,
        },
        {
            "name": "accidentJobRelatedIndicator",
            "optional": true,
        },
        {
            "name": "accidentDeathIndicator",
            "optional": true,
        },
        {
            "name": "enteredBy",
            "optional": true,
        },
        {
            "name": "accidentDescription",
            "optional": true,
        },
        {
            "name": "broughtInBy",
            "optional": true,
        },
        {
            "name": "policeNotifiedIndicator",
            "optional": true,
        },
        {
            "name": "accidentAddress",
            "optional": true,
        },
    ],
    "ADD": [
        {
            "name": "addendumContinuationPointer",
            "optional": true,
        },
    ],
    "AFF": [
        {
            "name": "setIdAff",
            "optional": false,
        },
        {
            "name": "professionalOrganization",
            "optional": false,
        },
        {
            "name": "professionalOrganizationAddress",
            "optional": true,
        },
        {
            "name": "professionalOrganizationAffiliationDateRange",
            "optional": true,
        },
        {
            "name": "professionalAffiliationAdditionalInformation",
            "optional": true,
        },
    ],
    "AIG": [
        {
            "name": "setIdAig",
            "optional": false,
        },
        {
            "name": "segmentActionCode",
            "optional": true,
        },
        {
            "name": "resourceId",
            "optional": true,
        },
        {
            "name": "resourceType",
            "optional": false,
        },
        {
            "name": "resourceGroup",
            "optional": true,
        },
        {
            "name": "resourceQuantity",
            "optional": true,
        },
        {
            "name": "resourceQuantityUnits",
            "optional": true,
        },
        {
            "name": "startDateTime",
            "optional": true,
        },
        {
            "name": "startDateTimeOffset",
            "optional": true,
        },
        {
            "name": "startDateTimeOffsetUnits",
            "optional": true,
        },
        {
            "name": "duration",
            "optional": true,
        },
        {
            "name": "durationUnits",
            "optional": true,
        },
        {
            "name": "allowSubstitutionCode",
            "optional": true,
        },
        {
            "name": "fillerStatusCode",
            "optional": true,
        },
    ],
    "AIL": [
        {
            "name": "setIdAil",
            "optional": false,
        },
        {
            "name": "segmentActionCode",
            "optional": true,
        },
        {
            "name": "locationResourceId",
            "optional": true,
        },
        {
            "name": "locationTypeAil",
            "optional": true,
        },
        {
            "name": "locationGroup",
            "optional": true,
        },
        {
            "name": "startDateTime",
            "optional": true,
        },
        {
            "name": "startDateTimeOffset",
            "optional": true,
        },
        {
            "name": "startDateTimeOffsetUnits",
            "optional": true,
        },
        {
            "name": "duration",
            "optional": true,
        },
        {
            "name": "durationUnits",
            "optional": true,
        },
        {
            "name": "allowSubstitutionCode",
            "optional": true,
        },
        {
            "name": "fillerStatusCode",
            "optional": true,
        },
    ],
    "AIP": [
        {
            "name": "setIdAip",
            "optional": false,
        },
        {
            "name": "segmentActionCode",
            "optional": true,
        },
        {
            "name": "personnelResourceId",
            "optional": true,
        },
        {
            "name": "resourceType",
            "optional": true,
        },
        {
            "name": "resourceGroup",
            "optional": true,
        },
        {
            "name": "startDateTime",
            "optional": true,
        },
        {
            "name": "startDateTimeOffset",
            "optional": true,
        },
        {
            "name": "startDateTimeOffsetUnits",
            "optional": true,
        },
        {
            "name": "duration",
            "optional": true,
        },
        {
            "name": "durationUnits",
            "optional": true,
        },
        {
            "name": "allowSubstitutionCode",
            "optional": true,
        },
        {
            "name": "fillerStatusCode",
            "optional": true,
        },
    ],
    "AIS": [
        {
            "name": "setIdAis",
            "optional": false,
        },
        {
            "name": "segmentActionCode",
            "optional": true,
        },
        {
            "name": "universalServiceIdentifier",
            "optional": false,
        },
        {
            "name": "startDateTime",
            "optional": true,
        },
        {
            "name": "startDateTimeOffset",
            "optional": true,
        },
        {
            "name": "startDateTimeOffsetUnits",
            "optional": true,
        },
        {
            "name": "duration",
            "optional": true,
        },
        {
            "name": "durationUnits",
            "optional": true,
        },
        {
            "name": "allowSubstitutionCode",
            "optional": true,
        },
        {
            "name": "fillerStatusCode",
            "optional": true,
        },
        {
            "name": "placerSupplementalServiceInformation",
            "optional": true,
        },
        {
            "name": "fillerSupplementalServiceInformation",
            "optional": true,
        },
    ],
    "AL1": [
        {
            "name": "setIdAl1",
            "optional": false,
        },
        {
            "name": "allergenTypeCode",
            "optional": true,
        },
        {
            "name": "allergenCodeMnemonicDescription",
            "optional": false,
        },
        {
            "name": "allergySeverityCode",
            "optional": true,
        },
        {
            "name": "allergyReactionCode",
            "optional": true,
        },
        {
            "name": "identificationDate",
            "optional": true,
        },
    ],
    "APR": [
        {
            "name": "timeSelectionCriteria",
            "optional": true,
        },
        {
            "name": "resourceSelectionCriteria",
            "optional": true,
        },
        {
            "name": "locationSelectionCriteria",
            "optional": true,
        },
        {
            "name": "slotSpacingCriteria",
            "optional": true,
        },
        {
            "name": "fillerOverrideCriteria",
            "optional": true,
        },
    ],
    "ARQ": [
        {
            "name": "placerAppointmentId",
            "optional": false,
        },
        {
            "name": "fillerAppointmentId",
            "optional": true,
        },
        {
            "name": "occurrenceNumber",
            "optional": true,
        },
        {
            "name": "placerGroupNumber",
            "optional": true,
        },
        {
            "name": "scheduleId",
            "optional": true,
        },
        {
            "name": "requestEventReason",
            "optional": true,
        },
        {
            "name": "appointmentReason",
            "optional": true,
        },
        {
            "name": "appointmentType",
            "optional": true,
        },
        {
            "name": "appointmentDuration",
            "optional": true,
        },
        {
            "name": "appointmentDurationUnits",
            "optional": true,
        },
        {
            "name": "requestedStartDateTimeRange",
            "optional": true,
        },
        {
            "name": "priorityArq",
            "optional": true,
        },
        {
            "name": "repeatingInterval",
            "optional": true,
        },
        {
            "name": "repeatingIntervalDuration",
            "optional": true,
        },
        {
            "name": "placerContactPerson",
            "optional": false,
        },
        {
            "name": "placerContactPhoneNumber",
            "optional": true,
        },
        {
            "name": "placerContactAddress",
            "optional": true,
        },
        {
            "name": "placerContactLocation",
            "optional": true,
        },
        {
            "name": "enteredByPerson",
            "optional": false,
        },
        {
            "name": "enteredByPhoneNumber",
            "optional": true,
        },
        {
            "name": "enteredByLocation",
            "optional": true,
        },
        {
            "name": "parentPlacerAppointmentId",
            "optional": true,
        },
        {
            "name": "parentFillerAppointmentId",
            "optional": true,
        },
        {
            "name": "placerOrderNumber",
            "optional": true,
        },
        {
            "name": "fillerOrderNumber",
            "optional": true,
        },
    ],
    "AUT": [
        {
            "name": "authorizingPayorPlanId",
            "optional": true,
        },
        {
            "name": "authorizingPayorCompanyId",
            "optional": false,
        },
        {
            "name": "authorizingPayorCompanyName",
            "optional": true,
        },
        {
            "name": "authorizationEffectiveDate",
            "optional": true,
        },
        {
            "name": "authorizationExpirationDate",
            "optional": true,
        },
        {
            "name": "authorizationIdentifier",
            "optional": true,
        },
        {
            "name": "reimbursementLimit",
            "optional": true,
        },
        {
            "name": "requestedNumberOfTreatments",
            "optional": true,
        },
        {
            "name": "authorizedNumberOfTreatments",
            "optional": true,
        },
        {
            "name": "processDate",
            "optional": true,
        },
    ],
    "BHS": [
        {
            "name": "batchFieldSeparator",
            "optional": false,
        },
        {
            "name": "batchEncodingCharacters",
            "optional": false,
        },
        {
            "name": "batchSendingApplication",
            "optional": true,
        },
        {
            "name": "batchSendingFacility",
            "optional": true,
        },
        {
            "name": "batchReceivingApplication",
            "optional": true,
        },
        {
            "name": "batchReceivingFacility",
            "optional": true,
        },
        {
            "name": "batchCreationDateTime",
            "optional": true,
        },
        {
            "name": "batchSecurity",
            "optional": true,
        },
        {
            "name": "batchNameIdType",
            "optional": true,
        },
        {
            "name": "batchComment",
            "optional": true,
        },
        {
            "name": "batchControlId",
            "optional": true,
        },
        {
            "name": "referenceBatchControlId",
            "optional": true,
        },
    ],
    "BLC": [
        {
            "name": "bloodProductCode",
            "optional": true,
        },
        {
            "name": "bloodAmount",
            "optional": true,
        },
    ],
    "BLG": [
        {
            "name": "whenToCharge",
            "optional": true,
        },
        {
            "name": "chargeType",
            "optional": true,
        },
        {
            "name": "accountId",
            "optional": true,
        },
        {
            "name": "chargeTypeReason",
            "optional": true,
        },
    ],
    "BPO": [
        {
            "name": "setIdBpo",
            "optional": false,
        },
        {
            "name": "bpUniversalServiceId",
            "optional": false,
        },
        {
            "name": "bpProcessingRequirements",
            "optional": true,
        },
        {
            "name": "bpQuantity",
            "optional": false,
        },
        {
            "name": "bpAmount",
            "optional": true,
        },
        {
            "name": "bpUnits",
            "optional": true,
        },
        {
            "name": "bpIntendedUseDateTime",
            "optional": true,
        },
        {
            "name": "bpIntendedDispenseFromLocation",
            "optional": true,
        },
        {
            "name": "bpIntendedDispenseFromAddress",
            "optional": true,
        },
        {
            "name": "bpRequestedDispenseDateTime",
            "optional": true,
        },
        {
            "name": "bpRequestedDispenseToLocation",
            "optional": true,
        },
        {
            "name": "bpRequestedDispenseToAddress",
            "optional": true,
        },
        {
            "name": "bpIndicationForUse",
            "optional": true,
        },
        {
            "name": "bpInformedConsentIndicator",
            "optional": true,
        },
    ],
    "BPX": [
        {
            "name": "setIdBpx",
            "optional": false,
        },
        {
            "name": "bpDispenseStatus",
            "optional": false,
        },
        {
            "name": "bpStatus",
            "optional": false,
        },
        {
            "name": "bpDateTimeOfStatus",
            "optional": false,
        },
        {
            "name": "bcDonationId",
            "optional": true,
        },
        {
            "name": "bcComponent",
            "optional": true,
        },
        {
            "name": "bcDonationTypeIntendedUse",
            "optional": true,
        },
        {
            "name": "cpCommercialProduct",
            "optional": true,
        },
        {
            "name": "cpManufacturer",
            "optional": true,
        },
        {
            "name": "cpLotNumber",
            "optional": true,
        },
        {
            "name": "bpBloodGroup",
            "optional": true,
        },
        {
            "name": "bcSpecialTesting",
            "optional": true,
        },
        {
            "name": "bpExpirationDateTime",
            "optional": true,
        },
        {
            "name": "bpQuantity",
            "optional": false,
        },
        {
            "name": "bpAmount",
            "optional": true,
        },
        {
            "name": "bpUnits",
            "optional": true,
        },
        {
            "name": "bpUniqueId",
            "optional": true,
        },
        {
            "name": "bpActualDispensedToLocation",
            "optional": true,
        },
        {
            "name": "bpActualDispensedToAddress",
            "optional": true,
        },
        {
            "name": "bpDispensedToReceiver",
            "optional": true,
        },
        {
            "name": "bpDispensingIndividual",
            "optional": true,
        },
    ],
    "BTS": [
        {
            "name": "batchMessageCount",
            "optional": true,
        },
        {
            "name": "batchComment",
            "optional": true,
        },
        {
            "name": "batchTotals",
            "optional": true,
        },
    ],
    "BTX": [
        {
            "name": "setIdBtx",
            "optional": false,
        },
        {
            "name": "bcDonationId",
            "optional": true,
        },
        {
            "name": "bcComponent",
            "optional": true,
        },
        {
            "name": "bcBloodGroup",
            "optional": true,
        },
        {
            "name": "cpCommercialProduct",
            "optional": true,
        },
        {
            "name": "cpManufacturer",
            "optional": true,
        },
        {
            "name": "cpLotNumber",
            "optional": true,
        },
        {
            "name": "bpQuantity",
            "optional": false,
        },
        {
            "name": "bpAmount",
            "optional": true,
        },
        {
            "name": "bpUnits",
            "optional": true,
        },
        {
            "name": "bpTransfusionDispositionStatus",
            "optional": false,
        },
        {
            "name": "bpMessageStatus",
            "optional": false,
        },
        {
            "name": "bpDateTimeOfStatus",
            "optional": false,
        },
        {
            "name": "bpAdministrator",
            "optional": true,
        },
        {
            "name": "bpVerifier",
            "optional": true,
        },
        {
            "name": "bpTransfusionStartDateTimeOfStatus",
            "optional": true,
        },
        {
            "name": "bpTransfusionEndDateTimeOfStatus",
            "optional": true,
        },
        {
            "name": "bpAdverseReactionType",
            "optional": true,
        },
        {
            "name": "bpTransfusionInterruptedReason",
            "optional": true,
        },
    ],
    "CDM": [
        {
            "name": "primaryKeyValueCdm",
            "optional": false,
        },
        {
            "name": "chargeCodeAlias",
            "optional": true,
        },
        {
            "name": "chargeDescriptionShort",
            "optional": false,
        },
        {
            "name": "chargeDescriptionLong",
            "optional": true,
        },
        {
            "name": "descriptionOverrideIndicator",
            "optional": true,
        },
        {
            "name": "explodingCharges",
            "optional": true,
        },
        {
            "name": "procedureCode",
            "optional": true,
        },
        {
            "name": "activeInactiveFlag",
            "optional": true,
        },
        {
            "name": "inventoryNumber",
            "optional": true,
        },
        {
            "name": "resourceLoad",
            "optional": true,
        },
        {
            "name": "contractNumber",
            "optional": true,
        },
        {
            "name": "contractOrganization",
            "optional": true,
        },
        {
            "name": "roomFeeIndicator",
            "optional": true,
        },
    ],
    "CER": [
        {
            "name": "setIdCer",
            "optional": false,
        },
        {
            "name": "serialNumber",
            "optional": true,
        },
        {
            "name": "version",
            "optional": true,
        },
        {
            "name": "grantingAuthority",
            "optional": true,
        },
        {
            "name": "issuingAuthority",
            "optional": true,
        },
        {
            "name": "signatureOfIssuingAuthority",
            "optional": true,
        },
        {
            "name": "grantingCountry",
            "optional": true,
        },
        {
            "name": "grantingStateProvince",
            "optional": true,
        },
        {
            "name": "grantingCountyParish",
            "optional": true,
        },
        {
            "name": "certificateType",
            "optional": true,
        },
        {
            "name": "certificateDomain",
            "optional": true,
        },
        {
            "name": "subjectId",
            "optional": true,
        },
        {
            "name": "subjectName",
            "optional": false,
        },
        {
            "name": "subjectDirectoryAttributeExtension",
            "optional": true,
        },
        {
            "name": "subjectPublicKeyInfo",
            "optional": true,
        },
        {
            "name": "authorityKeyIdentifier",
            "optional": true,
        },
        {
            "name": "basicConstraint",
            "optional": true,
        },
        {
            "name": "crlDistributionPoint",
            "optional": true,
        },
        {
            "name": "jurisdictionCountry",
            "optional": true,
        },
        {
            "name": "jurisdictionStateProvince",
            "optional": true,
        },
        {
            "name": "jurisdictionCountyParish",
            "optional": true,
        },
        {
            "name": "jurisdictionBreadth",
            "optional": true,
        },
        {
            "name": "grantingDate",
            "optional": true,
        },
        {
            "name": "issuingDate",
            "optional": true,
        },
        {
            "name": "activationDate",
            "optional": true,
        },
        {
            "name": "inactivationDate",
            "optional": true,
        },
        {
            "name": "expirationDate",
            "optional": true,
        },
        {
            "name": "renewalDate",
            "optional": true,
        },
        {
            "name": "revocationDate",
            "optional": true,
        },
        {
            "name": "revocationReasonCode",
            "optional": true,
        },
        {
            "name": "certificateStatus",
            "optional": true,
        },
    ],
    "CM0": [
        {
            "name": "setIdCm0",
            "optional": true,
        },
        {
            "name": "sponsorStudyId",
            "optional": false,
        },
        {
            "name": "alternateStudyId",
            "optional": true,
        },
        {
            "name": "titleOfStudy",
            "optional": false,
        },
        {
            "name": "chairmanOfStudy",
            "optional": true,
        },
        {
            "name": "lastIrbApprovalDate",
            "optional": true,
        },
        {
            "name": "totalAccrualToDate",
            "optional": true,
        },
        {
            "name": "lastAccrualDate",
            "optional": true,
        },
        {
            "name": "contactForStudy",
            "optional": true,
        },
        {
            "name": "contactsTelephoneNumber",
            "optional": true,
        },
        {
            "name": "contactsAddress",
            "optional": true,
        },
    ],
    "CM1": [
        {
            "name": "setIdCm1",
            "optional": false,
        },
        {
            "name": "studyPhaseIdentifier",
            "optional": false,
        },
        {
            "name": "descriptionOfStudyPhase",
            "optional": false,
        },
    ],
    "CM2": [
        {
            "name": "setIdCm2",
            "optional": true,
        },
        {
            "name": "scheduledTimePoint",
            "optional": false,
        },
        {
            "name": "descriptionOfTimePoint",
            "optional": true,
        },
        {
            "name": "eventsScheduledThisTimePoint",
            "optional": false,
        },
    ],
    "CNS": [
        {
            "name": "startingNotificationReferenceNumber",
            "optional": true,
        },
        {
            "name": "endingNotificationReferenceNumber",
            "optional": true,
        },
        {
            "name": "startingNotificationDateTime",
            "optional": true,
        },
        {
            "name": "endingNotificationDateTime",
            "optional": true,
        },
        {
            "name": "startingNotificationCode",
            "optional": true,
        },
        {
            "name": "endingNotificationCode",
            "optional": true,
        },
    ],
    "CON": [
        {
            "name": "setIdCon",
            "optional": false,
        },
        {
            "name": "consentType",
            "optional": true,
        },
        {
            "name": "consentFormId",
            "optional": true,
        },
        {
            "name": "consentFormNumber",
            "optional": true,
        },
        {
            "name": "consentText",
            "optional": true,
        },
        {
            "name": "subjectSpecificConsentText",
            "optional": true,
        },
        {
            "name": "consentBackground",
            "optional": true,
        },
        {
            "name": "subjectSpecificConsentBackground",
            "optional": true,
        },
        {
            "name": "consenterImposedLimitations",
            "optional": true,
        },
        {
            "name": "consentMode",
            "optional": true,
        },
        {
            "name": "consentStatus",
            "optional": false,
        },
        {
            "name": "consentDiscussionDateTime",
            "optional": true,
        },
        {
            "name": "consentDecisionDateTime",
            "optional": true,
        },
        {
            "name": "consentEffectiveDateTime",
            "optional": true,
        },
        {
            "name": "consentEndDateTime",
            "optional": true,
        },
        {
            "name": "subjectCompetenceIndicator",
            "optional": true,
        },
        {
            "name": "translatorAssistanceIndicator",
            "optional": true,
        },
        {
            "name": "languageTranslatedTo",
            "optional": true,
        },
        {
            "name": "informationalMaterialSuppliedIndicator",
            "optional": true,
        },
        {
            "name": "consentBypassReason",
            "optional": true,
        },
        {
            "name": "consentDisclosureLevel",
            "optional": true,
        },
        {
            "name": "consentNonDisclosureReason",
            "optional": true,
        },
        {
            "name": "nonSubjectConsenterReason",
            "optional": true,
        },
        {
            "name": "consenterId",
            "optional": false,
        },
        {
            "name": "relationshipToSubjectTable",
            "optional": false,
        },
    ],
    "CSP": [
        {
            "name": "studyPhaseIdentifier",
            "optional": false,
        },
        {
            "name": "dateTimeStudyPhaseBegan",
            "optional": false,
        },
        {
            "name": "dateTimeStudyPhaseEnded",
            "optional": true,
        },
        {
            "name": "studyPhaseEvaluability",
            "optional": true,
        },
    ],
    "CSR": [
        {
            "name": "sponsorStudyId",
            "optional": false,
        },
        {
            "name": "alternateStudyId",
            "optional": true,
        },
        {
            "name": "institutionRegisteringThePatient",
            "optional": true,
        },
        {
            "name": "sponsorPatientId",
            "optional": false,
        },
        {
            "name": "alternatePatientIdCsr",
            "optional": true,
        },
        {
            "name": "dateTimeOfPatientStudyRegistration",
            "optional": false,
        },
        {
            "name": "personPerformingStudyRegistration",
            "optional": true,
        },
        {
            "name": "studyAuthorizingProvider",
            "optional": false,
        },
        {
            "name": "dateTimePatientStudyConsentSigned",
            "optional": true,
        },
        {
            "name": "patientStudyEligibilityStatus",
            "optional": true,
        },
        {
            "name": "studyRandomizationDateTime",
            "optional": true,
        },
        {
            "name": "randomizedStudyArm",
            "optional": true,
        },
        {
            "name": "stratumForStudyRandomization",
            "optional": true,
        },
        {
            "name": "patientEvaluabilityStatus",
            "optional": true,
        },
        {
            "name": "dateTimeEndedStudy",
            "optional": true,
        },
        {
            "name": "reasonEndedStudy",
            "optional": true,
        },
    ],
    "CSS": [
        {
            "name": "studyScheduledTimePoint",
            "optional": false,
        },
        {
            "name": "studyScheduledPatientTimePoint",
            "optional": true,
        },
        {
            "name": "studyQualityControlCodes",
            "optional": true,
        },
    ],
    "CTD": [
        {
            "name": "contactRole",
            "optional": false,
        },
        {
            "name": "contactName",
            "optional": true,
        },
        {
            "name": "contactAddress",
            "optional": true,
        },
        {
            "name": "contactLocation",
            "optional": true,
        },
        {
            "name": "contactCommunicationInformation",
            "optional": true,
        },
        {
            "name": "preferredMethodOfContact",
            "optional": true,
        },
        {
            "name": "contactIdentifiers",
            "optional": true,
        },
    ],
    "CTI": [
        {
            "name": "sponsorStudyId",
            "optional": false,
        },
        {
            "name": "studyPhaseIdentifier",
            "optional": true,
        },
        {
            "name": "studyScheduledTimePoint",
            "optional": true,
        },
    ],
    "DB1": [
        {
            "name": "setIdDb1",
            "optional": false,
        },
        {
            "name": "disabledPersonCode",
            "optional": true,
        },
        {
            "name": "disabledPersonIdentifier",
            "optional": true,
        },
        {
            "name": "disabledIndicator",
            "optional": true,
        },
        {
            "name": "disabilityStartDate",
            "optional": true,
        },
        {
            "name": "disabilityEndDate",
            "optional": true,
        },
        {
            "name": "disabilityReturnToWorkDate",
            "optional": true,
        },
        {
            "name": "disabilityUnableToWorkDate",
            "optional": true,
        },
    ],
    "DG1": [
        {
            "name": "setIdDg1",
            "optional": false,
        },
        {
            "name": "diagnosisCodingMethod",
            "optional": true,
        },
        {
            "name": "diagnosisCodeDg1",
            "optional": true,
        },
        {
            "name": "diagnosisDescription",
            "optional": true,
        },
        {
            "name": "diagnosisDateTime",
            "optional": true,
        },
        {
            "name": "diagnosisType",
            "optional": false,
        },
        {
            "name": "majorDiagnosticCategory",
            "optional": true,
        },
        {
            "name": "diagnosticRelatedGroup",
            "optional": true,
        },
        {
            "name": "drgApprovalIndicator",
            "optional": true,
        },
        {
            "name": "drgGrouperReviewCode",
            "optional": true,
        },
        {
            "name": "outlierType",
            "optional": true,
        },
        {
            "name": "outlierDays",
            "optional": true,
        },
        {
            "name": "outlierCost",
            "optional": true,
        },
        {
            "name": "grouperVersionAndType",
            "optional": true,
        },
        {
            "name": "diagnosisPriority",
            "optional": true,
        },
        {
            "name": "diagnosingClinician",
            "optional": true,
        },
        {
            "name": "diagnosisClassification",
            "optional": true,
        },
        {
            "name": "confidentialIndicator",
            "optional": true,
        },
        {
            "name": "attestationDateTime",
            "optional": true,
        },
        {
            "name": "diagnosisIdentifier",
            "optional": true,
        },
        {
            "name": "diagnosisActionCode",
            "optional": true,
        },
    ],
    "DRG": [
        {
            "name": "diagnosticRelatedGroup",
            "optional": true,
        },
        {
            "name": "drgAssignedDateTime",
            "optional": true,
        },
        {
            "name": "drgApprovalIndicator",
            "optional": true,
        },
        {
            "name": "drgGrouperReviewCode",
            "optional": true,
        },
        {
            "name": "outlierType",
            "optional": true,
        },
        {
            "name": "outlierDays",
            "optional": true,
        },
        {
            "name": "outlierCost",
            "optional": true,
        },
        {
            "name": "drgPayor",
            "optional": true,
        },
        {
            "name": "outlierReimbursement",
            "optional": true,
        },
        {
            "name": "confidentialIndicator",
            "optional": true,
        },
        {
            "name": "drgTransferType",
            "optional": true,
        },
    ],
    "DSC": [
        {
            "name": "continuationPointer",
            "optional": true,
        },
        {
            "name": "continuationStyle",
            "optional": true,
        },
    ],
    "DSP": [
        {
            "name": "setIdDsp",
            "optional": true,
        },
        {
            "name": "displayLevel",
            "optional": true,
        },
        {
            "name": "dataLine",
            "optional": false,
        },
        {
            "name": "logicalBreakPoint",
            "optional": true,
        },
        {
            "name": "resultId",
            "optional": true,
        },
    ],
    "ECD": [
        {
            "name": "referenceCommandNumber",
            "optional": false,
        },
        {
            "name": "remoteControlCommand",
            "optional": false,
        },
        {
            "name": "responseRequired",
            "optional": true,
        },
        {
            "name": "requestedCompletionTime",
            "optional": true,
        },
        {
            "name": "parameters",
            "optional": true,
        },
    ],
    "ECR": [
        {
            "name": "commandResponse",
            "optional": false,
        },
        {
            "name": "dateTimeCompleted",
            "optional": false,
        },
        {
            "name": "commandResponseParameters",
            "optional": true,
        },
    ],
    "EDU": [
        {
            "name": "setIdEdu",
            "optional": false,
        },
        {
            "name": "academicDegree",
            "optional": true,
        },
        {
            "name": "academicDegreeProgramDateRange",
            "optional": true,
        },
        {
            "name": "academicDegreeProgramParticipationDateRange",
            "optional": true,
        },
        {
            "name": "academicDegreeGrantedDate",
            "optional": true,
        },
        {
            "name": "school",
            "optional": true,
        },
        {
            "name": "schoolTypeCode",
            "optional": true,
        },
        {
            "name": "schoolAddress",
            "optional": true,
        },
        {
            "name": "majorFieldOfStudy",
            "optional": true,
        },
    ],
    "EQL": [
        {
            "name": "queryTag",
            "optional": true,
        },
        {
            "name": "queryResponseFormatCode",
            "optional": false,
        },
        {
            "name": "eqlQueryName",
            "optional": false,
        },
        {
            "name": "eqlQueryStatement",
            "optional": false,
        },
    ],
    "EQP": [
        {
            "name": "eventType",
            "optional": false,
        },
        {
            "name": "fileName",
            "optional": true,
        },
        {
            "name": "startDateTime",
            "optional": false,
        },
        {
            "name": "endDateTime",
            "optional": true,
        },
        {
            "name": "transactionData",
            "optional": false,
        },
    ],
    "EQU": [
        {
            "name": "equipmentInstanceIdentifier",
            "optional": false,
        },
        {
            "name": "eventDateTime",
            "optional": false,
        },
        {
            "name": "equipmentState",
            "optional": true,
        },
        {
            "name": "localRemoteControlState",
            "optional": true,
        },
        {
            "name": "alertLevel",
            "optional": true,
        },
    ],
    "ERQ": [
        {
            "name": "queryTag",
            "optional": true,
        },
        {
            "name": "eventIdentifier",
            "optional": false,
        },
        {
            "name": "inputParameterList",
            "optional": true,
        },
    ],
    "ERR": [
        {
            "name": "errorCodeAndLocation",
            "optional": true,
        },
        {
            "name": "errorLocation",
            "optional": true,
        },
        {
            "name": "hl7ErrorCode",
            "optional": false,
        },
        {
            "name": "severity",
            "optional": false,
        },
        {
            "name": "applicationErrorCode",
            "optional": true,
        },
        {
            "name": "applicationErrorParameter",
            "optional": true,
        },
        {
            "name": "diagnosticInformation",
            "optional": true,
        },
        {
            "name": "userMessage",
            "optional": true,
        },
        {
            "name": "informPersonIndicator",
            "optional": true,
        },
        {
            "name": "overrideType",
            "optional": true,
        },
        {
            "name": "overrideReasonCode",
            "optional": true,
        },
        {
            "name": "helpDeskContactPoint",
            "optional": true,
        },
    ],
    "EVN": [
        {
            "name": "eventTypeCode",
            "optional": true,
        },
        {
            "name": "recordedDateTime",
            "optional": false,
        },
        {
            "name": "dateTimePlannedEvent",
            "optional": true,
        },
        {
            "name": "eventReasonCode",
            "optional": true,
        },
        {
            "name": "operatorId",
            "optional": true,
        },
        {
            "name": "eventOccurred",
            "optional": true,
        },
        {
            "name": "eventFacility",
            "optional": true,
        },
    ],
    "FAC": [
        {
            "name": "facilityIdFac",
            "optional": false,
        },
        {
            "name": "facilityType",
            "optional": true,
        },
        {
            "name": "facilityAddress",
            "optional": false,
        },
        {
            "name": "facilityTelecommunication",
            "optional": false,
        },
        {
            "name": "contactPerson",
            "optional": true,
        },
        {
            "name": "contactTitle",
            "optional": true,
        },
        {
            "name": "contactAddress",
            "optional": true,
        },
        {
            "name": "contactTelecommunication",
            "optional": true,
        },
        {
            "name": "signatureAuthority",
            "optional": false,
        },
        {
            "name": "signatureAuthorityTitle",
            "optional": true,
        },
        {
            "name": "signatureAuthorityAddress",
            "optional": true,
        },
        {
            "name": "signatureAuthorityTelecommunication",
            "optional": true,
        },
    ],
    "FHS": [
        {
            "name": "fileFieldSeparator",
            "optional": false,
        },
        {
            "name": "fileEncodingCharacters",
            "optional": false,
        },
        {
            "name": "fileSendingApplication",
            "optional": true,
        },
        {
            "name": "fileSendingFacility",
            "optional": true,
        },
        {
            "name": "fileReceivingApplication",
            "optional": true,
        },
        {
            "name": "fileReceivingFacility",
            "optional": true,
        },
        {
            "name": "fileCreationDateTime",
            "optional": true,
        },
        {
            "name": "fileSecurity",
            "optional": true,
        },
        {
            "name": "fileNameId",
            "optional": true,
        },
        {
            "name": "fileHeaderComment",
            "optional": true,
        },
        {
            "name": "fileControlId",
            "optional": true,
        },
        {
            "name": "referenceFileControlId",
            "optional": true,
        },
    ],
    "FT1": [
        {
            "name": "setIdFt1",
            "optional": true,
        },
        {
            "name": "transactionId",
            "optional": true,
        },
        {
            "name": "transactionBatchId",
            "optional": true,
        },
        {
            "name": "transactionDate",
            "optional": false,
        },
        {
            "name": "transactionPostingDate",
            "optional": true,
        },
        {
            "name": "transactionType",
            "optional": false,
        },
        {
            "name": "transactionCode",
            "optional": false,
        },
        {
            "name": "transactionDescription",
            "optional": true,
        },
        {
            "name": "transactionDescriptionAlt",
            "optional": true,
        },
        {
            "name": "transactionQuantity",
            "optional": true,
        },
        {
            "name": "transactionAmountExtended",
            "optional": true,
        },
        {
            "name": "transactionAmountUnit",
            "optional": true,
        },
        {
            "name": "departmentCode",
            "optional": true,
        },
        {
            "name": "insurancePlanId",
            "optional": true,
        },
        {
            "name": "insuranceAmount",
            "optional": true,
        },
        {
            "name": "assignedPatientLocation",
            "optional": true,
        },
        {
            "name": "feeSchedule",
            "optional": true,
        },
        {
            "name": "patientType",
            "optional": true,
        },
        {
            "name": "diagnosisCodeFt1",
            "optional": true,
        },
        {
            "name": "performedByCode",
            "optional": true,
        },
        {
            "name": "orderedByCode",
            "optional": true,
        },
        {
            "name": "unitCost",
            "optional": true,
        },
        {
            "name": "fillerOrderNumber",
            "optional": true,
        },
        {
            "name": "enteredByCode",
            "optional": true,
        },
        {
            "name": "procedureCode",
            "optional": true,
        },
        {
            "name": "procedureCodeModifier",
            "optional": true,
        },
        {
            "name": "advancedBeneficiaryNoticeCode",
            "optional": true,
        },
        {
            "name": "medicallyNecessaryDuplicateProcedureReason",
            "optional": true,
        },
        {
            "name": "ndcCode",
            "optional": true,
        },
        {
            "name": "paymentReferenceId",
            "optional": true,
        },
        {
            "name": "transactionReferenceKey",
            "optional": true,
        },
    ],
    "FTS": [
        {
            "name": "fileBatchCount",
            "optional": true,
        },
        {
            "name": "fileTrailerComment",
            "optional": true,
        },
    ],
    "GOL": [
        {
            "name": "actionCode",
            "optional": false,
        },
        {
            "name": "actionDateTime",
            "optional": false,
        },
        {
            "name": "goalId",
            "optional": false,
        },
        {
            "name": "goalInstanceId",
            "optional": false,
        },
        {
            "name": "episodeOfCareId",
            "optional": true,
        },
        {
            "name": "goalListPriority",
            "optional": true,
        },
        {
            "name": "goalEstablishedDateTime",
            "optional": true,
        },
        {
            "name": "expectedGoalAchieveDateTime",
            "optional": true,
        },
        {
            "name": "goalClassification",
            "optional": true,
        },
        {
            "name": "goalManagementDiscipline",
            "optional": true,
        },
        {
            "name": "currentGoalReviewStatus",
            "optional": true,
        },
        {
            "name": "currentGoalReviewDateTime",
            "optional": true,
        },
        {
            "name": "nextGoalReviewDateTime",
            "optional": true,
        },
        {
            "name": "previousGoalReviewDateTime",
            "optional": true,
        },
        {
            "name": "goalReviewInterval",
            "optional": true,
        },
        {
            "name": "goalEvaluation",
            "optional": true,
        },
        {
            "name": "goalEvaluationComment",
            "optional": true,
        },
        {
            "name": "goalLifeCycleStatus",
            "optional": true,
        },
        {
            "name": "goalLifeCycleStatusDateTime",
            "optional": true,
        },
        {
            "name": "goalTargetType",
            "optional": true,
        },
        {
            "name": "goalTargetName",
            "optional": true,
        },
    ],
    "GP1": [
        {
            "name": "typeOfBillCode",
            "optional": false,
        },
        {
            "name": "revenueCode",
            "optional": true,
        },
        {
            "name": "overallClaimDispositionCode",
            "optional": true,
        },
        {
            "name": "oceEditsPerVisitCode",
            "optional": true,
        },
        {
            "name": "outlierCost",
            "optional": true,
        },
    ],
    "GP2": [
        {
            "name": "revenueCode",
            "optional": true,
        },
        {
            "name": "numberOfServiceUnits",
            "optional": true,
        },
        {
            "name": "charge",
            "optional": true,
        },
        {
            "name": "reimbursementActionCode",
            "optional": true,
        },
        {
            "name": "denialOrRejectionCode",
            "optional": true,
        },
        {
            "name": "oceEditCode",
            "optional": true,
        },
        {
            "name": "ambulatoryPaymentClassificationCode",
            "optional": true,
        },
        {
            "name": "modifierEditCode",
            "optional": true,
        },
        {
            "name": "paymentAdjustmentCode",
            "optional": true,
        },
        {
            "name": "packagingStatusCode",
            "optional": true,
        },
        {
            "name": "expectedCmsPaymentAmount",
            "optional": true,
        },
        {
            "name": "reimbursementTypeCode",
            "optional": true,
        },
        {
            "name": "coPayAmount",
            "optional": true,
        },
        {
            "name": "payRatePerServiceUnit",
            "optional": true,
        },
    ],
    "GT1": [
        {
            "name": "setIdGt1",
            "optional": false,
        },
        {
            "name": "guarantorNumber",
            "optional": true,
        },
        {
            "name": "guarantorName",
            "optional": false,
        },
        {
            "name": "guarantorSpouseName",
            "optional": true,
        },
        {
            "name": "guarantorAddress",
            "optional": true,
        },
        {
            "name": "guarantorPhNumHome",
            "optional": true,
        },
        {
            "name": "guarantorPhNumBusiness",
            "optional": true,
        },
        {
            "name": "guarantorDateTimeOfBirth",
            "optional": true,
        },
        {
            "name": "guarantorAdministrativeSex",
            "optional": true,
        },
        {
            "name": "guarantorType",
            "optional": true,
        },
        {
            "name": "guarantorRelationship",
            "optional": true,
        },
        {
            "name": "guarantorSsn",
            "optional": true,
        },
        {
            "name": "guarantorDateBegin",
            "optional": true,
        },
        {
            "name": "guarantorDateEnd",
            "optional": true,
        },
        {
            "name": "guarantorPriority",
            "optional": true,
        },
        {
            "name": "guarantorEmployerName",
            "optional": true,
        },
        {
            "name": "guarantorEmployerAddress",
            "optional": true,
        },
        {
            "name": "guarantorEmployerPhoneNumber",
            "optional": true,
        },
        {
            "name": "guarantorEmployeeIdNumber",
            "optional": true,
        },
        {
            "name": "guarantorEmploymentStatus",
            "optional": true,
        },
        {
            "name": "guarantorOrganizationName",
            "optional": true,
        },
        {
            "name": "guarantorBillingHoldFlag",
            "optional": true,
        },
        {
            "name": "guarantorCreditRatingCode",
            "optional": true,
        },
        {
            "name": "guarantorDeathDateAndTime",
            "optional": true,
        },
        {
            "name": "guarantorDeathFlag",
            "optional": true,
        },
        {
            "name": "guarantorChargeAdjustmentCode",
            "optional": true,
        },
        {
            "name": "guarantorHouseholdAnnualIncome",
            "optional": true,
        },
        {
            "name": "guarantorHouseholdSize",
            "optional": true,
        },
        {
            "name": "guarantorEmployerIdNumber",
            "optional": true,
        },
        {
            "name": "guarantorMaritalStatusCode",
            "optional": true,
        },
        {
            "name": "guarantorHireEffectiveDate",
            "optional": true,
        },
        {
            "name": "employmentStopDate",
            "optional": true,
        },
        {
            "name": "livingDependency",
            "optional": true,
        },
        {
            "name": "ambulatoryStatus",
            "optional": true,
        },
        {
            "name": "citizenship",
            "optional": true,
        },
        {
            "name": "primaryLanguage",
            "optional": true,
        },
        {
            "name": "livingArrangement",
            "optional": true,
        },
        {
            "name": "publicityCode",
            "optional": true,
        },
        {
            "name": "protectionIndicator",
            "optional": true,
        },
        {
            "name": "studentIndicator",
            "optional": true,
        },
        {
            "name": "religion",
            "optional": true,
        },
        {
            "name": "mothersMaidenName",
            "optional": true,
        },
        {
            "name": "nationality",
            "optional": true,
        },
        {
            "name": "ethnicGroup",
            "optional": true,
        },
        {
            "name": "contactPersonsName",
            "optional": true,
        },
        {
            "name": "contactPersonsTelephoneNumber",
            "optional": true,
        },
        {
            "name": "contactReason",
            "optional": true,
        },
        {
            "name": "contactRelationship",
            "optional": true,
        },
        {
            "name": "jobTitle",
            "optional": true,
        },
        {
            "name": "jobCodeClass",
            "optional": true,
        },
        {
            "name": "guarantorEmployersOrganizationName",
            "optional": true,
        },
        {
            "name": "handicap",
            "optional": true,
        },
        {
            "name": "jobStatus",
            "optional": true,
        },
        {
            "name": "guarantorFinancialClass",
            "optional": true,
        },
        {
            "name": "guarantorRace",
            "optional": true,
        },
        {
            "name": "guarantorBirthPlace",
            "optional": true,
        },
        {
            "name": "vipIndicator",
            "optional": true,
        },
    ],
    "IAM": [
        {
            "name": "setIdIam",
            "optional": false,
        },
        {
            "name": "allergenTypeCode",
            "optional": true,
        },
        {
            "name": "allergenCodeMnemonicDescription",
            "optional": false,
        },
        {
            "name": "allergySeverityCode",
            "optional": true,
        },
        {
            "name": "allergyReactionCode",
            "optional": true,
        },
        {
            "name": "allergyActionCode",
            "optional": false,
        },
        {
            "name": "allergyUniqueIdentifier",
            "optional": true,
        },
        {
            "name": "actionReason",
            "optional": true,
        },
        {
            "name": "sensitivityToCausativeAgentCode",
            "optional": true,
        },
        {
            "name": "allergenGroupCodeMnemonicDescription",
            "optional": true,
        },
        {
            "name": "onsetDate",
            "optional": true,
        },
        {
            "name": "onsetDateText",
            "optional": true,
        },
        {
            "name": "reportedDateTime",
            "optional": true,
        },
        {
            "name": "reportedBy",
            "optional": true,
        },
        {
            "name": "relationshipToPatientCode",
            "optional": true,
        },
        {
            "name": "alertDeviceCode",
            "optional": true,
        },
        {
            "name": "allergyClinicalStatusCode",
            "optional": true,
        },
        {
            "name": "statusedByPerson",
            "optional": true,
        },
        {
            "name": "statusedByOrganization",
            "optional": true,
        },
        {
            "name": "statusedAtDateTime",
            "optional": true,
        },
    ],
    "IIM": [
        {
            "name": "primaryKeyValueIim",
            "optional": false,
        },
        {
            "name": "serviceItemCode",
            "optional": false,
        },
        {
            "name": "inventoryLotNumber",
            "optional": true,
        },
        {
            "name": "inventoryExpirationDate",
            "optional": true,
        },
        {
            "name": "inventoryManufacturerName",
            "optional": true,
        },
        {
            "name": "inventoryLocation",
            "optional": true,
        },
        {
            "name": "inventoryReceivedDate",
            "optional": true,
        },
        {
            "name": "inventoryReceivedQuantity",
            "optional": true,
        },
        {
            "name": "inventoryReceivedQuantityUnit",
            "optional": true,
        },
        {
            "name": "inventoryReceivedItemCost",
            "optional": true,
        },
        {
            "name": "inventoryOnHandDate",
            "optional": true,
        },
        {
            "name": "inventoryOnHandQuantity",
            "optional": true,
        },
        {
            "name": "inventoryOnHandQuantityUnit",
            "optional": true,
        },
        {
            "name": "procedureCode",
            "optional": true,
        },
        {
            "name": "procedureCodeModifier",
            "optional": true,
        },
    ],
    "IN1": [
        {
            "name": "setIdIn1",
            "optional": false,
        },
        {
            "name": "insurancePlanId",
            "optional": false,
        },
        {
            "name": "insuranceCompanyId",
            "optional": false,
        },
        {
            "name": "insuranceCompanyName",
            "optional": true,
        },
        {
            "name": "insuranceCompanyAddress",
            "optional": true,
        },
        {
            "name": "insuranceCoContactPerson",
            "optional": true,
        },
        {
            "name": "insuranceCoPhoneNumber",
            "optional": true,
        },
        {
            "name": "groupNumber",
            "optional": true,
        },
        {
            "name": "groupName",
            "optional": true,
        },
        {
            "name": "insuredsGroupEmpId",
            "optional": true,
        },
        {
            "name": "insuredsGroupEmpName",
            "optional": true,
        },
        {
            "name": "planEffectiveDate",
            "optional": true,
        },
        {
            "name": "planExpirationDate",
            "optional": true,
        },
        {
            "name": "authorizationInformation",
            "optional": true,
        },
        {
            "name": "planType",
            "optional": true,
        },
        {
            "name": "nameOfInsured",
            "optional": true,
        },
        {
            "name": "insuredsRelationshipToPatient",
            "optional": true,
        },
        {
            "name": "insuredsDateOfBirth",
            "optional": true,
        },
        {
            "name": "insuredsAddress",
            "optional": true,
        },
        {
            "name": "assignmentOfBenefits",
            "optional": true,
        },
        {
            "name": "coordinationOfBenefits",
            "optional": true,
        },
        {
            "name": "coordOfBenPriority",
            "optional": true,
        },
        {
            "name": "noticeOfAdmissionFlag",
            "optional": true,
        },
        {
            "name": "noticeOfAdmissionDate",
            "optional": true,
        },
        {
            "name": "reportOfEligibilityFlag",
            "optional": true,
        },
        {
            "name": "reportOfEligibilityDate",
            "optional": true,
        },
        {
            "name": "releaseInformationCode",
            "optional": true,
        },
        {
            "name": "preAdmitCert",
            "optional": true,
        },
        {
            "name": "verificationDateTime",
            "optional": true,
        },
        {
            "name": "verificationBy",
            "optional": true,
        },
        {
            "name": "typeOfAgreementCode",
            "optional": true,
        },
        {
            "name": "billingStatus",
            "optional": true,
        },
        {
            "name": "lifetimeReserveDays",
            "optional": true,
        },
        {
            "name": "delayBeforeLRDay",
            "optional": true,
        },
        {
            "name": "companyPlanCode",
            "optional": true,
        },
        {
            "name": "policyNumber",
            "optional": true,
        },
        {
            "name": "policyDeductible",
            "optional": true,
        },
        {
            "name": "policyLimitAmount",
            "optional": true,
        },
        {
            "name": "policyLimitDays",
            "optional": true,
        },
        {
            "name": "roomRateSemiPrivate",
            "optional": true,
        },
        {
            "name": "roomRatePrivate",
            "optional": true,
        },
        {
            "name": "insuredsEmploymentStatus",
            "optional": true,
        },
        {
            "name": "insuredsAdministrativeSex",
            "optional": true,
        },
        {
            "name": "insuredsEmployersAddress",
            "optional": true,
        },
        {
            "name": "verificationStatus",
            "optional": true,
        },
        {
            "name": "priorInsurancePlanId",
            "optional": true,
        },
        {
            "name": "coverageType",
            "optional": true,
        },
        {
            "name": "handicap",
            "optional": true,
        },
        {
            "name": "insuredsIdNumber",
            "optional": true,
        },
        {
            "name": "signatureCode",
            "optional": true,
        },
        {
            "name": "signatureCodeDate",
            "optional": true,
        },
        {
            "name": "insuredSBirthPlace",
            "optional": true,
        },
        {
            "name": "vipIndicator",
            "optional": true,
        },
    ],
    "IN2": [
        {
            "name": "insuredsEmployeeId",
            "optional": true,
        },
        {
            "name": "insuredsSocialSecurityNumber",
            "optional": true,
        },
        {
            "name": "insuredsEmployersNameAndId",
            "optional": true,
        },
        {
            "name": "employerInformationData",
            "optional": true,
        },
        {
            "name": "mailClaimParty",
            "optional": true,
        },
        {
            "name": "medicareHealthInsCardNumber",
            "optional": true,
        },
        {
            "name": "medicaidCaseName",
            "optional": true,
        },
        {
            "name": "medicaidCaseNumber",
            "optional": true,
        },
        {
            "name": "militarySponsorName",
            "optional": true,
        },
        {
            "name": "militaryIdNumber",
            "optional": true,
        },
        {
            "name": "dependentOfMilitaryRecipient",
            "optional": true,
        },
        {
            "name": "militaryOrganization",
            "optional": true,
        },
        {
            "name": "militaryStation",
            "optional": true,
        },
        {
            "name": "militaryService",
            "optional": true,
        },
        {
            "name": "militaryRankGrade",
            "optional": true,
        },
        {
            "name": "militaryStatus",
            "optional": true,
        },
        {
            "name": "militaryRetireDate",
            "optional": true,
        },
        {
            "name": "militaryNonAvailCertOnFile",
            "optional": true,
        },
        {
            "name": "babyCoverage",
            "optional": true,
        },
        {
            "name": "combineBabyBill",
            "optional": true,
        },
        {
            "name": "bloodDeductible",
            "optional": true,
        },
        {
            "name": "specialCoverageApprovalName",
            "optional": true,
        },
        {
            "name": "specialCoverageApprovalTitle",
            "optional": true,
        },
        {
            "name": "nonCoveredInsuranceCode",
            "optional": true,
        },
        {
            "name": "payorId",
            "optional": true,
        },
        {
            "name": "payorSubscriberId",
            "optional": true,
        },
        {
            "name": "eligibilitySource",
            "optional": true,
        },
        {
            "name": "roomCoverageTypeAmount",
            "optional": true,
        },
        {
            "name": "policyTypeAmount",
            "optional": true,
        },
        {
            "name": "dailyDeductible",
            "optional": true,
        },
        {
            "name": "livingDependency",
            "optional": true,
        },
        {
            "name": "ambulatoryStatus",
            "optional": true,
        },
        {
            "name": "citizenship",
            "optional": true,
        },
        {
            "name": "primaryLanguage",
            "optional": true,
        },
        {
            "name": "livingArrangement",
            "optional": true,
        },
        {
            "name": "publicityCode",
            "optional": true,
        },
        {
            "name": "protectionIndicator",
            "optional": true,
        },
        {
            "name": "studentIndicator",
            "optional": true,
        },
        {
            "name": "religion",
            "optional": true,
        },
        {
            "name": "mothersMaidenName",
            "optional": true,
        },
        {
            "name": "nationality",
            "optional": true,
        },
        {
            "name": "ethnicGroup",
            "optional": true,
        },
        {
            "name": "maritalStatus",
            "optional": true,
        },
        {
            "name": "insuredsEmploymentStartDate",
            "optional": true,
        },
        {
            "name": "employmentStopDate",
            "optional": true,
        },
        {
            "name": "jobTitle",
            "optional": true,
        },
        {
            "name": "jobCodeClass",
            "optional": true,
        },
        {
            "name": "jobStatus",
            "optional": true,
        },
        {
            "name": "employerContactPersonName",
            "optional": true,
        },
        {
            "name": "employerContactPersonPhoneNumber",
            "optional": true,
        },
        {
            "name": "employerContactReason",
            "optional": true,
        },
        {
            "name": "insuredsContactPersonsName",
            "optional": true,
        },
        {
            "name": "insuredsContactPersonPhoneNumber",
            "optional": true,
        },
        {
            "name": "insuredsContactPersonReason",
            "optional": true,
        },
        {
            "name": "relationshipToThePatientStartDate",
            "optional": true,
        },
        {
            "name": "relationshipToThePatientStopDate",
            "optional": true,
        },
        {
            "name": "insuranceCoContactReason",
            "optional": true,
        },
        {
            "name": "insuranceCoContactPhoneNumber",
            "optional": true,
        },
        {
            "name": "policyScope",
            "optional": true,
        },
        {
            "name": "policySource",
            "optional": true,
        },
        {
            "name": "patientMemberNumber",
            "optional": true,
        },
        {
            "name": "guarantorsRelationshipToInsured",
            "optional": true,
        },
        {
            "name": "insuredsPhoneNumberHome",
            "optional": true,
        },
        {
            "name": "insuredsEmployerPhoneNumber",
            "optional": true,
        },
        {
            "name": "militaryHandicappedProgram",
            "optional": true,
        },
        {
            "name": "suspendFlag",
            "optional": true,
        },
        {
            "name": "copayLimitFlag",
            "optional": true,
        },
        {
            "name": "stoplossLimitFlag",
            "optional": true,
        },
        {
            "name": "insuredOrganizationNameAndId",
            "optional": true,
        },
        {
            "name": "insuredEmployerOrganizationNameAndId",
            "optional": true,
        },
        {
            "name": "race",
            "optional": true,
        },
        {
            "name": "cmsPatientSRelationshipToInsured",
            "optional": true,
        },
    ],
    "IN3": [
        {
            "name": "setIdIn3",
            "optional": false,
        },
        {
            "name": "certificationNumber",
            "optional": true,
        },
        {
            "name": "certifiedBy",
            "optional": true,
        },
        {
            "name": "certificationRequired",
            "optional": true,
        },
        {
            "name": "penalty",
            "optional": true,
        },
        {
            "name": "certificationDateTime",
            "optional": true,
        },
        {
            "name": "certificationModifyDateTime",
            "optional": true,
        },
        {
            "name": "operator",
            "optional": true,
        },
        {
            "name": "certificationBeginDate",
            "optional": true,
        },
        {
            "name": "certificationEndDate",
            "optional": true,
        },
        {
            "name": "days",
            "optional": true,
        },
        {
            "name": "nonConcurCodeDescription",
            "optional": true,
        },
        {
            "name": "nonConcurEffectiveDateTime",
            "optional": true,
        },
        {
            "name": "physicianReviewer",
            "optional": true,
        },
        {
            "name": "certificationContact",
            "optional": true,
        },
        {
            "name": "certificationContactPhoneNumber",
            "optional": true,
        },
        {
            "name": "appealReason",
            "optional": true,
        },
        {
            "name": "certificationAgency",
            "optional": true,
        },
        {
            "name": "certificationAgencyPhoneNumber",
            "optional": true,
        },
        {
            "name": "preCertificationRequirement",
            "optional": true,
        },
        {
            "name": "caseManager",
            "optional": true,
        },
        {
            "name": "secondOpinionDate",
            "optional": true,
        },
        {
            "name": "secondOpinionStatus",
            "optional": true,
        },
        {
            "name": "secondOpinionDocumentationReceived",
            "optional": true,
        },
        {
            "name": "secondOpinionPhysician",
            "optional": true,
        },
    ],
    "INV": [
        {
            "name": "substanceIdentifier",
            "optional": false,
        },
        {
            "name": "substanceStatus",
            "optional": false,
        },
        {
            "name": "substanceType",
            "optional": true,
        },
        {
            "name": "inventoryContainerIdentifier",
            "optional": true,
        },
        {
            "name": "containerCarrierIdentifier",
            "optional": true,
        },
        {
            "name": "positionOnCarrier",
            "optional": true,
        },
        {
            "name": "initialQuantity",
            "optional": true,
        },
        {
            "name": "currentQuantity",
            "optional": true,
        },
        {
            "name": "availableQuantity",
            "optional": true,
        },
        {
            "name": "consumptionQuantity",
            "optional": true,
        },
        {
            "name": "quantityUnits",
            "optional": true,
        },
        {
            "name": "expirationDateTime",
            "optional": true,
        },
        {
            "name": "firstUsedDateTime",
            "optional": true,
        },
        {
            "name": "onBoardStabilityDuration",
            "optional": true,
        },
        {
            "name": "testFluidIdentifier",
            "optional": true,
        },
        {
            "name": "manufacturerLotNumber",
            "optional": true,
        },
        {
            "name": "manufacturerIdentifier",
            "optional": true,
        },
        {
            "name": "supplierIdentifier",
            "optional": true,
        },
        {
            "name": "onBoardStabilityTime",
            "optional": true,
        },
        {
            "name": "targetValue",
            "optional": true,
        },
    ],
    "IPC": [
        {
            "name": "accessionIdentifier",
            "optional": false,
        },
        {
            "name": "requestedProcedureId",
            "optional": false,
        },
        {
            "name": "studyInstanceUid",
            "optional": false,
        },
        {
            "name": "scheduledProcedureStepId",
            "optional": false,
        },
        {
            "name": "modality",
            "optional": true,
        },
        {
            "name": "protocolCode",
            "optional": true,
        },
        {
            "name": "scheduledStationName",
            "optional": true,
        },
        {
            "name": "scheduledProcedureStepLocation",
            "optional": true,
        },
        {
            "name": "scheduledAeTitle",
            "optional": true,
        },
    ],
    "ISD": [
        {
            "name": "referenceInteractionNumber",
            "optional": false,
        },
        {
            "name": "interactionTypeIdentifier",
            "optional": true,
        },
        {
            "name": "interactionActiveState",
            "optional": false,
        },
    ],
    "LAN": [
        {
            "name": "setIdLan",
            "optional": false,
        },
        {
            "name": "languageCode",
            "optional": false,
        },
        {
            "name": "languageAbilityCode",
            "optional": true,
        },
        {
            "name": "languageProficiencyCode",
            "optional": true,
        },
    ],
    "LCC": [
        {
            "name": "primaryKeyValueLcc",
            "optional": false,
        },
        {
            "name": "locationDepartment",
            "optional": false,
        },
        {
            "name": "accommodationType",
            "optional": true,
        },
        {
            "name": "chargeCode",
            "optional": false,
        },
    ],
    "LCH": [
        {
            "name": "primaryKeyValueLch",
            "optional": false,
        },
        {
            "name": "segmentActionCode",
            "optional": true,
        },
        {
            "name": "segmentUniqueKey",
            "optional": true,
        },
        {
            "name": "locationCharacteristicId",
            "optional": false,
        },
        {
            "name": "locationCharacteristicValueLch",
            "optional": false,
        },
    ],
    "LDP": [
        {
            "name": "primaryKeyValueLdp",
            "optional": false,
        },
        {
            "name": "locationDepartment",
            "optional": false,
        },
        {
            "name": "locationService",
            "optional": true,
        },
        {
            "name": "specialtyType",
            "optional": true,
        },
        {
            "name": "validPatientClasses",
            "optional": true,
        },
        {
            "name": "activeInactiveFlag",
            "optional": true,
        },
        {
            "name": "activationDateLdp",
            "optional": true,
        },
        {
            "name": "inactivationDateLdp",
            "optional": true,
        },
        {
            "name": "inactivatedReason",
            "optional": true,
        },
        {
            "name": "visitingHours",
            "optional": true,
        },
        {
            "name": "contactPhone",
            "optional": true,
        },
        {
            "name": "locationCostCenter",
            "optional": true,
        },
    ],
    "LOC": [
        {
            "name": "primaryKeyValueLoc",
            "optional": false,
        },
        {
            "name": "locationDescription",
            "optional": true,
        },
        {
            "name": "locationTypeLoc",
            "optional": false,
        },
        {
            "name": "organizationNameLoc",
            "optional": true,
        },
        {
            "name": "locationAddress",
            "optional": true,
        },
        {
            "name": "locationPhone",
            "optional": true,
        },
        {
            "name": "licenseNumber",
            "optional": true,
        },
        {
            "name": "locationEquipment",
            "optional": true,
        },
        {
            "name": "locationServiceCode",
            "optional": true,
        },
    ],
    "LRL": [
        {
            "name": "primaryKeyValueLrl",
            "optional": false,
        },
        {
            "name": "segmentActionCode",
            "optional": true,
        },
        {
            "name": "segmentUniqueKey",
            "optional": true,
        },
        {
            "name": "locationRelationshipId",
            "optional": false,
        },
        {
            "name": "organizationalLocationRelationshipValue",
            "optional": true,
        },
        {
            "name": "patientLocationRelationshipValue",
            "optional": true,
        },
    ],
    "MFA": [
        {
            "name": "recordLevelEventCode",
            "optional": false,
        },
        {
            "name": "mfnControlId",
            "optional": true,
        },
        {
            "name": "eventCompletionDateTime",
            "optional": true,
        },
        {
            "name": "mfnRecordLevelErrorReturn",
            "optional": false,
        },
        {
            "name": "primaryKeyValueMfa",
            "optional": false,
        },
        {
            "name": "primaryKeyValueTypeMfa",
            "optional": false,
        },
    ],
    "MFE": [
        {
            "name": "recordLevelEventCode",
            "optional": false,
        },
        {
            "name": "mfnControlId",
            "optional": true,
        },
        {
            "name": "effectiveDateTime",
            "optional": true,
        },
        {
            "name": "primaryKeyValueMfe",
            "optional": false,
        },
        {
            "name": "primaryKeyValueType",
            "optional": false,
        },
    ],
    "MFI": [
        {
            "name": "masterFileIdentifier",
            "optional": false,
        },
        {
            "name": "masterFileApplicationIdentifier",
            "optional": true,
        },
        {
            "name": "fileLevelEventCode",
            "optional": false,
        },
        {
            "name": "enteredDateTime",
            "optional": true,
        },
        {
            "name": "effectiveDateTime",
            "optional": true,
        },
        {
            "name": "responseLevelCode",
            "optional": false,
        },
    ],
    "MRG": [
        {
            "name": "priorPatientIdentifierList",
            "optional": false,
        },
        {
            "name": "priorAlternatePatientId",
            "optional": true,
        },
        {
            "name": "priorPatientAccountNumber",
            "optional": true,
        },
        {
            "name": "priorPatientId",
            "optional": true,
        },
        {
            "name": "priorVisitNumber",
            "optional": true,
        },
        {
            "name": "priorAlternateVisitId",
            "optional": true,
        },
        {
            "name": "priorPatientName",
            "optional": true,
        },
    ],
    "MSA": [
        {
            "name": "acknowledgmentCode",
            "optional": false,
        },
        {
            "name": "messageControlId",
            "optional": false,
        },
        {
            "name": "textMessage",
            "optional": true,
        },
        {
            "name": "expectedSequenceNumber",
            "optional": true,
        },
        {
            "name": "delayedAcknowledgmentType",
            "optional": true,
        },
        {
            "name": "errorCondition",
            "optional": true,
        },
    ],
    "MSH": [
        {
            "name": "fieldSeparator",
            "optional": false,
        },
        {
            "name": "encodingCharacters",
            "optional": false,
        },
        {
            "name": "sendingApplication",
            "optional": true,
        },
        {
            "name": "sendingFacility",
            "optional": true,
        },
        {
            "name": "receivingApplication",
            "optional": true,
        },
        {
            "name": "receivingFacility",
            "optional": true,
        },
        {
            "name": "dateTimeOfMessage",
            "optional": false,
        },
        {
            "name": "security",
            "optional": true,
        },
        {
            "name": "messageType",
            "optional": false,
        },
        {
            "name": "messageControlId",
            "optional": false,
        },
        {
            "name": "processingId",
            "optional": false,
        },
        {
            "name": "versionId",
            "optional": false,
        },
        {
            "name": "sequenceNumber",
            "optional": true,
        },
        {
            "name": "continuationPointer",
            "optional": true,
        },
        {
            "name": "acceptAcknowledgmentType",
            "optional": true,
        },
        {
            "name": "applicationAcknowledgmentType",
            "optional": true,
        },
        {
            "name": "countryCode",
            "optional": true,
        },
        {
            "name": "characterSet",
            "optional": true,
        },
        {
            "name": "principalLanguageOfMessage",
            "optional": true,
        },
        {
            "name": "alternateCharacterSetHandlingScheme",
            "optional": true,
        },
        {
            "name": "messageProfileIdentifier",
            "optional": true,
        },
    ],
    "NCK": [
        {
            "name": "systemDateTime",
            "optional": false,
        },
    ],
    "NDS": [
        {
            "name": "notificationReferenceNumber",
            "optional": false,
        },
        {
            "name": "notificationDateTime",
            "optional": false,
        },
        {
            "name": "notificationAlertSeverity",
            "optional": false,
        },
        {
            "name": "notificationCode",
            "optional": false,
        },
    ],
    "NK1": [
        {
            "name": "setIdNk1",
            "optional": false,
        },
        {
            "name": "name",
            "optional": true,
        },
        {
            "name": "relationship",
            "optional": true,
        },
        {
            "name": "address",
            "optional": true,
        },
        {
            "name": "phoneNumber",
            "optional": true,
        },
        {
            "name": "businessPhoneNumber",
            "optional": true,
        },
        {
            "name": "contactRole",
            "optional": true,
        },
        {
            "name": "startDate",
            "optional": true,
        },
        {
            "name": "endDate",
            "optional": true,
        },
        {
            "name": "nextOfKinAssociatedPartiesJobTitle",
            "optional": true,
        },
        {
            "name": "nextOfKinAssociatedPartiesJobCodeClass",
            "optional": true,
        },
        {
            "name": "nextOfKinAssociatedPartiesEmployeeNumber",
            "optional": true,
        },
        {
            "name": "organizationNameNk1",
            "optional": true,
        },
        {
            "name": "maritalStatus",
            "optional": true,
        },
        {
            "name": "administrativeSex",
            "optional": true,
        },
        {
            "name": "dateTimeOfBirth",
            "optional": true,
        },
        {
            "name": "livingDependency",
            "optional": true,
        },
        {
            "name": "ambulatoryStatus",
            "optional": true,
        },
        {
            "name": "citizenship",
            "optional": true,
        },
        {
            "name": "primaryLanguage",
            "optional": true,
        },
        {
            "name": "livingArrangement",
            "optional": true,
        },
        {
            "name": "publicityCode",
            "optional": true,
        },
        {
            "name": "protectionIndicator",
            "optional": true,
        },
        {
            "name": "studentIndicator",
            "optional": true,
        },
        {
            "name": "religion",
            "optional": true,
        },
        {
            "name": "mothersMaidenName",
            "optional": true,
        },
        {
            "name": "nationality",
            "optional": true,
        },
        {
            "name": "ethnicGroup",
            "optional": true,
        },
        {
            "name": "contactReason",
            "optional": true,
        },
        {
            "name": "contactPersonsName",
            "optional": true,
        },
        {
            "name": "contactPersonsTelephoneNumber",
            "optional": true,
        },
        {
            "name": "contactPersonsAddress",
            "optional": true,
        },
        {
            "name": "nextOfKinAssociatedPartysIdentifiers",
            "optional": true,
        },
        {
            "name": "jobStatus",
            "optional": true,
        },
        {
            "name": "race",
            "optional": true,
        },
        {
            "name": "handicap",
            "optional": true,
        },
        {
            "name": "contactPersonSocialSecurityNumber",
            "optional": true,
        },
        {
            "name": "nextOfKinBirthPlace",
            "optional": true,
        },
        {
            "name": "vipIndicator",
            "optional": true,
        },
    ],
    "NPU": [
        {
            "name": "bedLocation",
            "optional": false,
        },
        {
            "name": "bedStatus",
            "optional": true,
        },
    ],
    "NSC": [
        {
            "name": "applicationChangeType",
            "optional": false,
        },
        {
            "name": "currentCpu",
            "optional": true,
        },
        {
            "name": "currentFileserver",
            "optional": true,
        },
        {
            "name": "currentApplication",
            "optional": true,
        },
        {
            "name": "currentFacility",
            "optional": true,
        },
        {
            "name": "newCpu",
            "optional": true,
        },
        {
            "name": "newFileserver",
            "optional": true,
        },
        {
            "name": "newApplication",
            "optional": true,
        },
        {
            "name": "newFacility",
            "optional": true,
        },
    ],
    "NST": [
        {
            "name": "statisticsAvailable",
            "optional": false,
        },
        {
            "name": "sourceIdentifier",
            "optional": true,
        },
        {
            "name": "sourceType",
            "optional": true,
        },
        {
            "name": "statisticsStart",
            "optional": true,
        },
        {
            "name": "statisticsEnd",
            "optional": true,
        },
        {
            "name": "receiveCharacterCount",
            "optional": true,
        },
        {
            "name": "sendCharacterCount",
            "optional": true,
        },
        {
            "name": "messagesReceived",
            "optional": true,
        },
        {
            "name": "messagesSent",
            "optional": true,
        },
        {
            "name": "checksumErrorsReceived",
            "optional": true,
        },
        {
            "name": "lengthErrorsReceived",
            "optional": true,
        },
        {
            "name": "otherErrorsReceived",
            "optional": true,
        },
        {
            "name": "connectTimeouts",
            "optional": true,
        },
        {
            "name": "receiveTimeouts",
            "optional": true,
        },
        {
            "name": "applicationControlLevelErrors",
            "optional": true,
        },
    ],
    "NTE": [
        {
            "name": "setIdNte",
            "optional": true,
        },
        {
            "name": "sourceOfComment",
            "optional": true,
        },
        {
            "name": "comment",
            "optional": true,
        },
        {
            "name": "commentType",
            "optional": true,
        },
    ],
    "OBR": [
        {
            "name": "setIdObr",
            "optional": true,
        },
        {
            "name": "placerOrderNumber",
            "optional": true,
        },
        {
            "name": "fillerOrderNumber",
            "optional": true,
        },
        {
            "name": "universalServiceIdentifier",
            "optional": false,
        },
        {
            "name": "priorityObr",
            "optional": true,
        },
        {
            "name": "requestedDateTime",
            "optional": true,
        },
        {
            "name": "observationDateTime",
            "optional": true,
        },
        {
            "name": "observationEndDateTime",
            "optional": true,
        },
        {
            "name": "collectionVolume",
            "optional": true,
        },
        {
            "name": "collectorIdentifier",
            "optional": true,
        },
        {
            "name": "specimenActionCode",
            "optional": true,
        },
        {
            "name": "dangerCode",
            "optional": true,
        },
        {
            "name": "relevantClinicalInformation",
            "optional": true,
        },
        {
            "name": "specimenReceivedDateTime",
            "optional": true,
        },
        {
            "name": "specimenSource",
            "optional": true,
        },
        {
            "name": "orderingProvider",
            "optional": true,
        },
        {
            "name": "orderCallbackPhoneNumber",
            "optional": true,
        },
        {
            "name": "placerField1",
            "optional": true,
        },
        {
            "name": "placerField2",
            "optional": true,
        },
        {
            "name": "fillerField1",
            "optional": true,
        },
        {
            "name": "fillerField2",
            "optional": true,
        },
        {
            "name": "resultsRptStatusChngDateTime",
            "optional": true,
        },
        {
            "name": "chargeToPractice",
            "optional": true,
        },
        {
            "name": "diagnosticServSectId",
            "optional": true,
        },
        {
            "name": "resultStatus",
            "optional": true,
        },
        {
            "name": "parentResult",
            "optional": true,
        },
        {
            "name": "quantityTiming",
            "optional": true,
        },
        {
            "name": "resultCopiesTo",
            "optional": true,
        },
        {
            "name": "parent",
            "optional": true,
        },
        {
            "name": "transportationMode",
            "optional": true,
        },
        {
            "name": "reasonForStudy",
            "optional": true,
        },
        {
            "name": "principalResultInterpreter",
            "optional": true,
        },
        {
            "name": "assistantResultInterpreter",
            "optional": true,
        },
        {
            "name": "technician",
            "optional": true,
        },
        {
            "name": "transcriptionist",
            "optional": true,
        },
        {
            "name": "scheduledDateTime",
            "optional": true,
        },
        {
            "name": "numberOfSampleContainers",
            "optional": true,
        },
        {
            "name": "transportLogisticsOfCollectedSample",
            "optional": true,
        },
        {
            "name": "collectorsComment",
            "optional": true,
        },
        {
            "name": "transportArrangementResponsibility",
            "optional": true,
        },
        {
            "name": "transportArranged",
            "optional": true,
        },
        {
            "name": "escortRequired",
            "optional": true,
        },
        {
            "name": "plannedPatientTransportComment",
            "optional": true,
        },
        {
            "name": "procedureCode",
            "optional": true,
        },
        {
            "name": "procedureCodeModifier",
            "optional": true,
        },
        {
            "name": "placerSupplementalServiceInformation",
            "optional": true,
        },
        {
            "name": "fillerSupplementalServiceInformation",
            "optional": true,
        },
        {
            "name": "medicallyNecessaryDuplicateProcedureReason",
            "optional": true,
        },
        {
            "name": "resultHandling",
            "optional": true,
        },
    ],
    "OBX": [
        {
            "name": "setIdObx",
            "optional": true,
        },
        {
            "name": "valueType",
            "optional": true,
        },
        {
            "name": "observationIdentifier",
            "optional": false,
        },
        {
            "name": "observationSubId",
            "optional": true,
        },
        {
            "name": "observationValue",
            "optional": true,
        },
        {
            "name": "units",
            "optional": true,
        },
        {
            "name": "referencesRange",
            "optional": true,
        },
        {
            "name": "abnormalFlags",
            "optional": true,
        },
        {
            "name": "probability",
            "optional": true,
        },
        {
            "name": "natureOfAbnormalTest",
            "optional": true,
        },
        {
            "name": "observationResultStatus",
            "optional": false,
        },
        {
            "name": "effectiveDateOfReferenceRange",
            "optional": true,
        },
        {
            "name": "userDefinedAccessChecks",
            "optional": true,
        },
        {
            "name": "dateTimeOfTheObservation",
            "optional": true,
        },
        {
            "name": "producersId",
            "optional": true,
        },
        {
            "name": "responsibleObserver",
            "optional": true,
        },
        {
            "name": "observationMethod",
            "optional": true,
        },
        {
            "name": "equipmentInstanceIdentifier",
            "optional": true,
        },
        {
            "name": "dateTimeOfTheAnalysis",
            "optional": true,
        },
    ],
    "ODS": [
        {
            "name": "type",
            "optional": false,
        },
        {
            "name": "servicePeriod",
            "optional": true,
        },
        {
            "name": "dietSupplementOrPreferenceCode",
            "optional": false,
        },
        {
            "name": "textInstruction",
            "optional": true,
        },
    ],
    "ODT": [
        {
            "name": "trayType",
            "optional": false,
        },
        {
            "name": "servicePeriod",
            "optional": true,
        },
        {
            "name": "textInstruction",
            "optional": true,
        },
    ],
    "OM1": [
        {
            "name": "sequenceNumberTestObservationMasterFile",
            "optional": false,
        },
        {
            "name": "producersServiceTestObservationId",
            "optional": false,
        },
        {
            "name": "permittedDataTypes",
            "optional": true,
        },
        {
            "name": "specimenRequired",
            "optional": false,
        },
        {
            "name": "producerId",
            "optional": false,
        },
        {
            "name": "observationDescription",
            "optional": true,
        },
        {
            "name": "otherServiceTestObservationIDsForTheObservation",
            "optional": true,
        },
        {
            "name": "otherNames",
            "optional": false,
        },
        {
            "name": "preferredReportNameForTheObservation",
            "optional": true,
        },
        {
            "name": "preferredShortNameOrMnemonicForObservation",
            "optional": true,
        },
        {
            "name": "preferredLongNameForTheObservation",
            "optional": true,
        },
        {
            "name": "orderability",
            "optional": true,
        },
        {
            "name": "identityOfInstrumentUsedToPerformThisStudy",
            "optional": true,
        },
        {
            "name": "codedRepresentationOfMethod",
            "optional": true,
        },
        {
            "name": "portableDeviceIndicator",
            "optional": true,
        },
        {
            "name": "observationProducingDepartmentSection",
            "optional": true,
        },
        {
            "name": "telephoneNumberOfSection",
            "optional": true,
        },
        {
            "name": "natureOfServiceTestObservation",
            "optional": false,
        },
        {
            "name": "reportSubheader",
            "optional": true,
        },
        {
            "name": "reportDisplayOrder",
            "optional": true,
        },
        {
            "name": "dateTimeStampForAnyChangeInDefinitionForTheObservation",
            "optional": true,
        },
        {
            "name": "effectiveDateTimeOfChange",
            "optional": true,
        },
        {
            "name": "typicalTurnAroundTime",
            "optional": true,
        },
        {
            "name": "processingTime",
            "optional": true,
        },
        {
            "name": "processingPriority",
            "optional": true,
        },
        {
            "name": "reportingPriority",
            "optional": true,
        },
        {
            "name": "outsideSiteWhereObservationMayBePerformed",
            "optional": true,
        },
        {
            "name": "addressOfOutsideSite",
            "optional": true,
        },
        {
            "name": "phoneNumberOfOutsideSite",
            "optional": true,
        },
        {
            "name": "confidentialityCode",
            "optional": true,
        },
        {
            "name": "observationsRequiredToInterpretTheObservation",
            "optional": true,
        },
        {
            "name": "interpretationOfObservations",
            "optional": true,
        },
        {
            "name": "contraindicationsToObservations",
            "optional": true,
        },
        {
            "name": "reflexTestsObservations",
            "optional": true,
        },
        {
            "name": "rulesThatTriggerReflexTesting",
            "optional": true,
        },
        {
            "name": "fixedCannedMessage",
            "optional": true,
        },
        {
            "name": "patientPreparation",
            "optional": true,
        },
        {
            "name": "procedureMedication",
            "optional": true,
        },
        {
            "name": "factorsThatMayAffectTheObservation",
            "optional": true,
        },
        {
            "name": "serviceTestObservationPerformanceSchedule",
            "optional": true,
        },
        {
            "name": "descriptionOfTestMethods",
            "optional": true,
        },
        {
            "name": "kindOfQuantityObserved",
            "optional": true,
        },
        {
            "name": "pointVersusInterval",
            "optional": true,
        },
        {
            "name": "challengeInformation",
            "optional": true,
        },
        {
            "name": "relationshipModifier",
            "optional": true,
        },
        {
            "name": "targetAnatomicSiteOfTest",
            "optional": true,
        },
        {
            "name": "modalityOfImagingMeasurement",
            "optional": true,
        },
    ],
    "OM2": [
        {
            "name": "sequenceNumberTestObservationMasterFile",
            "optional": true,
        },
        {
            "name": "unitsOfMeasure",
            "optional": true,
        },
        {
            "name": "rangeOfDecimalPrecision",
            "optional": true,
        },
        {
            "name": "correspondingSiUnitsOfMeasure",
            "optional": true,
        },
        {
            "name": "siConversionFactor",
            "optional": true,
        },
        {
            "name": "referenceRangeOrdinalAndContinuousObservations",
            "optional": true,
        },
        {
            "name": "criticalRangeForOrdinalAndContinuousObservations",
            "optional": true,
        },
        {
            "name": "absoluteRangeForOrdinalAndContinuousObservations",
            "optional": true,
        },
        {
            "name": "deltaCheckCriteria",
            "optional": true,
        },
        {
            "name": "minimumMeaningfulIncrements",
            "optional": true,
        },
    ],
    "OM3": [
        {
            "name": "sequenceNumberTestObservationMasterFile",
            "optional": true,
        },
        {
            "name": "preferredCodingSystem",
            "optional": true,
        },
        {
            "name": "validCodedAnswers",
            "optional": true,
        },
        {
            "name": "normalTextCodesForCategoricalObservations",
            "optional": true,
        },
        {
            "name": "abnormalTextCodesForCategoricalObservations",
            "optional": true,
        },
        {
            "name": "criticalTextCodesForCategoricalObservations",
            "optional": true,
        },
        {
            "name": "valueType",
            "optional": true,
        },
    ],
    "OM4": [
        {
            "name": "sequenceNumberTestObservationMasterFile",
            "optional": true,
        },
        {
            "name": "derivedSpecimen",
            "optional": true,
        },
        {
            "name": "containerDescription",
            "optional": true,
        },
        {
            "name": "containerVolume",
            "optional": true,
        },
        {
            "name": "containerUnits",
            "optional": true,
        },
        {
            "name": "specimen",
            "optional": true,
        },
        {
            "name": "additive",
            "optional": true,
        },
        {
            "name": "preparation",
            "optional": true,
        },
        {
            "name": "specialHandlingRequirements",
            "optional": true,
        },
        {
            "name": "normalCollectionVolume",
            "optional": true,
        },
        {
            "name": "minimumCollectionVolume",
            "optional": true,
        },
        {
            "name": "specimenRequirements",
            "optional": true,
        },
        {
            "name": "specimenPriorities",
            "optional": true,
        },
        {
            "name": "specimenRetentionTime",
            "optional": true,
        },
    ],
    "OM5": [
        {
            "name": "sequenceNumberTestObservationMasterFile",
            "optional": true,
        },
        {
            "name": "testObservationsIncludedWithinAnOrderedTestBattery",
            "optional": true,
        },
        {
            "name": "observationIdSuffixes",
            "optional": true,
        },
    ],
    "OM6": [
        {
            "name": "sequenceNumberTestObservationMasterFile",
            "optional": true,
        },
        {
            "name": "derivationRule",
            "optional": true,
        },
    ],
    "OM7": [
        {
            "name": "sequenceNumberTestObservationMasterFile",
            "optional": false,
        },
        {
            "name": "universalServiceIdentifier",
            "optional": false,
        },
        {
            "name": "categoryIdentifier",
            "optional": true,
        },
        {
            "name": "categoryDescription",
            "optional": true,
        },
        {
            "name": "categorySynonym",
            "optional": true,
        },
        {
            "name": "effectiveTestServiceStartDateTime",
            "optional": true,
        },
        {
            "name": "effectiveTestServiceEndDateTime",
            "optional": true,
        },
        {
            "name": "testServiceDefaultDurationQuantity",
            "optional": true,
        },
        {
            "name": "testServiceDefaultDurationUnits",
            "optional": true,
        },
        {
            "name": "testServiceDefaultFrequency",
            "optional": true,
        },
        {
            "name": "consentIndicator",
            "optional": true,
        },
        {
            "name": "consentIdentifier",
            "optional": true,
        },
        {
            "name": "consentEffectiveStartDateTime",
            "optional": true,
        },
        {
            "name": "consentEffectiveEndDateTime",
            "optional": true,
        },
        {
            "name": "consentIntervalQuantity",
            "optional": true,
        },
        {
            "name": "consentIntervalUnits",
            "optional": true,
        },
        {
            "name": "consentWaitingPeriodQuantity",
            "optional": true,
        },
        {
            "name": "consentWaitingPeriodUnits",
            "optional": true,
        },
        {
            "name": "effectiveDateTimeOfChange",
            "optional": true,
        },
        {
            "name": "enteredBy",
            "optional": true,
        },
        {
            "name": "orderableAtLocation",
            "optional": true,
        },
        {
            "name": "formularyStatus",
            "optional": true,
        },
        {
            "name": "specialOrderIndicator",
            "optional": true,
        },
        {
            "name": "primaryKeyValueCdm",
            "optional": true,
        },
    ],
    "ORC": [
        {
            "name": "orderControl",
            "optional": false,
        },
        {
            "name": "placerOrderNumber",
            "optional": true,
        },
        {
            "name": "fillerOrderNumber",
            "optional": true,
        },
        {
            "name": "placerGroupNumber",
            "optional": true,
        },
        {
            "name": "orderStatus",
            "optional": true,
        },
        {
            "name": "responseFlag",
            "optional": true,
        },
        {
            "name": "quantityTiming",
            "optional": true,
        },
        {
            "name": "parent",
            "optional": true,
        },
        {
            "name": "dateTimeOfTransaction",
            "optional": true,
        },
        {
            "name": "enteredBy",
            "optional": true,
        },
        {
            "name": "verifiedBy",
            "optional": true,
        },
        {
            "name": "orderingProvider",
            "optional": true,
        },
        {
            "name": "enterersLocation",
            "optional": true,
        },
        {
            "name": "callBackPhoneNumber",
            "optional": true,
        },
        {
            "name": "orderEffectiveDateTime",
            "optional": true,
        },
        {
            "name": "orderControlCodeReason",
            "optional": true,
        },
        {
            "name": "enteringOrganization",
            "optional": true,
        },
        {
            "name": "enteringDevice",
            "optional": true,
        },
        {
            "name": "actionBy",
            "optional": true,
        },
        {
            "name": "advancedBeneficiaryNoticeCode",
            "optional": true,
        },
        {
            "name": "orderingFacilityName",
            "optional": true,
        },
        {
            "name": "orderingFacilityAddress",
            "optional": true,
        },
        {
            "name": "orderingFacilityPhoneNumber",
            "optional": true,
        },
        {
            "name": "orderingProviderAddress",
            "optional": true,
        },
        {
            "name": "orderStatusModifier",
            "optional": true,
        },
        {
            "name": "advancedBeneficiaryNoticeOverrideReason",
            "optional": true,
        },
        {
            "name": "fillersExpectedAvailabilityDateTime",
            "optional": true,
        },
        {
            "name": "confidentialityCode",
            "optional": true,
        },
        {
            "name": "orderType",
            "optional": true,
        },
        {
            "name": "entererAuthorizationMode",
            "optional": true,
        },
    ],
    "ORG": [
        {
            "name": "setIdOrg",
            "optional": false,
        },
        {
            "name": "organizationUnitCode",
            "optional": true,
        },
        {
            "name": "organizationUnitTypeCode",
            "optional": true,
        },
        {
            "name": "primaryOrgUnitIndicator",
            "optional": true,
        },
        {
            "name": "practitionerOrgUnitIdentifier",
            "optional": true,
        },
        {
            "name": "healthCareProviderTypeCode",
            "optional": true,
        },
        {
            "name": "healthCareProviderClassificationCode",
            "optional": true,
        },
        {
            "name": "healthCareProviderAreaOfSpecializationCode",
            "optional": true,
        },
        {
            "name": "effectiveDateRange",
            "optional": true,
        },
        {
            "name": "employmentStatusCode",
            "optional": true,
        },
        {
            "name": "boardApprovalIndicator",
            "optional": true,
        },
        {
            "name": "primaryCarePhysicianIndicator",
            "optional": true,
        },
    ],
    "OVR": [
        {
            "name": "businessRuleOverrideType",
            "optional": true,
        },
        {
            "name": "businessRuleOverrideCode",
            "optional": true,
        },
        {
            "name": "overrideComments",
            "optional": true,
        },
        {
            "name": "overrideEnteredBy",
            "optional": true,
        },
        {
            "name": "overrideAuthorizedBy",
            "optional": true,
        },
    ],
    "PCR": [
        {
            "name": "implicatedProduct",
            "optional": false,
        },
        {
            "name": "genericProduct",
            "optional": true,
        },
        {
            "name": "productClass",
            "optional": true,
        },
        {
            "name": "totalDurationOfTherapy",
            "optional": true,
        },
        {
            "name": "productManufactureDate",
            "optional": true,
        },
        {
            "name": "productExpirationDate",
            "optional": true,
        },
        {
            "name": "productImplantationDate",
            "optional": true,
        },
        {
            "name": "productExplantationDate",
            "optional": true,
        },
        {
            "name": "singleUseDevice",
            "optional": true,
        },
        {
            "name": "indicationForProductUse",
            "optional": true,
        },
        {
            "name": "productProblem",
            "optional": true,
        },
        {
            "name": "productSerialLotNumber",
            "optional": true,
        },
        {
            "name": "productAvailableForInspection",
            "optional": true,
        },
        {
            "name": "productEvaluationPerformed",
            "optional": true,
        },
        {
            "name": "productEvaluationStatus",
            "optional": true,
        },
        {
            "name": "productEvaluationResults",
            "optional": true,
        },
        {
            "name": "evaluatedProductSource",
            "optional": true,
        },
        {
            "name": "dateProductReturnedToManufacturer",
            "optional": true,
        },
        {
            "name": "deviceOperatorQualifications",
            "optional": true,
        },
        {
            "name": "relatednessAssessment",
            "optional": true,
        },
        {
            "name": "actionTakenInResponseToTheEvent",
            "optional": true,
        },
        {
            "name": "eventCausalityObservations",
            "optional": true,
        },
        {
            "name": "indirectExposureMechanism",
            "optional": true,
        },
    ],
    "PD1": [
        {
            "name": "livingDependency",
            "optional": true,
        },
        {
            "name": "livingArrangement",
            "optional": true,
        },
        {
            "name": "patientPrimaryFacility",
            "optional": true,
        },
        {
            "name": "patientPrimaryCareProviderNameIdNo",
            "optional": true,
        },
        {
            "name": "studentIndicator",
            "optional": true,
        },
        {
            "name": "handicap",
            "optional": true,
        },
        {
            "name": "livingWillCode",
            "optional": true,
        },
        {
            "name": "organDonorCode",
            "optional": true,
        },
        {
            "name": "separateBill",
            "optional": true,
        },
        {
            "name": "duplicatePatient",
            "optional": true,
        },
        {
            "name": "publicityCode",
            "optional": true,
        },
        {
            "name": "protectionIndicator",
            "optional": true,
        },
        {
            "name": "protectionIndicatorEffectiveDate",
            "optional": true,
        },
        {
            "name": "placeOfWorship",
            "optional": true,
        },
        {
            "name": "advanceDirectiveCode",
            "optional": true,
        },
        {
            "name": "immunizationRegistryStatus",
            "optional": true,
        },
        {
            "name": "immunizationRegistryStatusEffectiveDate",
            "optional": true,
        },
        {
            "name": "publicityCodeEffectiveDate",
            "optional": true,
        },
        {
            "name": "militaryBranch",
            "optional": true,
        },
        {
            "name": "militaryRankGrade",
            "optional": true,
        },
        {
            "name": "militaryStatus",
            "optional": true,
        },
    ],
    "PDA": [
        {
            "name": "deathCauseCode",
            "optional": true,
        },
        {
            "name": "deathLocation",
            "optional": true,
        },
        {
            "name": "deathCertifiedIndicator",
            "optional": true,
        },
        {
            "name": "deathCertificateSignedDateTime",
            "optional": true,
        },
        {
            "name": "deathCertifiedBy",
            "optional": true,
        },
        {
            "name": "autopsyIndicator",
            "optional": true,
        },
        {
            "name": "autopsyStartAndEndDateTime",
            "optional": true,
        },
        {
            "name": "autopsyPerformedBy",
            "optional": true,
        },
        {
            "name": "coronerIndicator",
            "optional": true,
        },
    ],
    "PDC": [
        {
            "name": "manufacturerDistributor",
            "optional": false,
        },
        {
            "name": "country",
            "optional": false,
        },
        {
            "name": "brandName",
            "optional": false,
        },
        {
            "name": "deviceFamilyName",
            "optional": true,
        },
        {
            "name": "genericName",
            "optional": true,
        },
        {
            "name": "modelIdentifier",
            "optional": true,
        },
        {
            "name": "catalogueIdentifier",
            "optional": true,
        },
        {
            "name": "otherIdentifier",
            "optional": true,
        },
        {
            "name": "productCode",
            "optional": true,
        },
        {
            "name": "marketingBasis",
            "optional": true,
        },
        {
            "name": "marketingApprovalId",
            "optional": true,
        },
        {
            "name": "labeledShelfLife",
            "optional": true,
        },
        {
            "name": "expectedShelfLife",
            "optional": true,
        },
        {
            "name": "dateFirstMarketed",
            "optional": true,
        },
        {
            "name": "dateLastMarketed",
            "optional": true,
        },
    ],
    "PEO": [
        {
            "name": "eventIdentifiersUsed",
            "optional": true,
        },
        {
            "name": "eventSymptomDiagnosisCode",
            "optional": true,
        },
        {
            "name": "eventOnsetDateTime",
            "optional": false,
        },
        {
            "name": "eventExacerbationDateTime",
            "optional": true,
        },
        {
            "name": "eventImprovedDateTime",
            "optional": true,
        },
        {
            "name": "eventEndedDataTime",
            "optional": true,
        },
        {
            "name": "eventLocationOccurredAddress",
            "optional": true,
        },
        {
            "name": "eventQualification",
            "optional": true,
        },
        {
            "name": "eventSerious",
            "optional": true,
        },
        {
            "name": "eventExpected",
            "optional": true,
        },
        {
            "name": "eventOutcome",
            "optional": true,
        },
        {
            "name": "patientOutcome",
            "optional": true,
        },
        {
            "name": "eventDescriptionFromOthers",
            "optional": true,
        },
        {
            "name": "eventFromOriginalReporter",
            "optional": true,
        },
        {
            "name": "eventDescriptionFromPatient",
            "optional": true,
        },
        {
            "name": "eventDescriptionFromPractitioner",
            "optional": true,
        },
        {
            "name": "eventDescriptionFromAutopsy",
            "optional": true,
        },
        {
            "name": "causeOfDeath",
            "optional": true,
        },
        {
            "name": "primaryObserverName",
            "optional": true,
        },
        {
            "name": "primaryObserverAddress",
            "optional": true,
        },
        {
            "name": "primaryObserverTelephone",
            "optional": true,
        },
        {
            "name": "primaryObserversQualification",
            "optional": true,
        },
        {
            "name": "confirmationProvidedBy",
            "optional": true,
        },
        {
            "name": "primaryObserverAwareDateTime",
            "optional": true,
        },
        {
            "name": "primaryObserversIdentityMayBeDivulged",
            "optional": true,
        },
    ],
    "PES": [
        {
            "name": "senderOrganizationName",
            "optional": true,
        },
        {
            "name": "senderIndividualName",
            "optional": true,
        },
        {
            "name": "senderAddress",
            "optional": true,
        },
        {
            "name": "senderTelephone",
            "optional": true,
        },
        {
            "name": "senderEventIdentifier",
            "optional": true,
        },
        {
            "name": "senderSequenceNumber",
            "optional": true,
        },
        {
            "name": "senderEventDescription",
            "optional": true,
        },
        {
            "name": "senderComment",
            "optional": true,
        },
        {
            "name": "senderAwareDateTime",
            "optional": true,
        },
        {
            "name": "eventReportDate",
            "optional": false,
        },
        {
            "name": "eventReportTimingType",
            "optional": true,
        },
        {
            "name": "eventReportSource",
            "optional": true,
        },
        {
            "name": "eventReportedTo",
            "optional": true,
        },
    ],
    "PID": [
        {
            "name": "setIdPid",
            "optional": true,
        },
        {
            "name": "patientId",
            "optional": true,
        },
        {
            "name": "patientIdentifierList",
            "optional": false,
        },
        {
            "name": "alternatePatientIdPid",
            "optional": true,
        },
        {
            "name": "patientName",
            "optional": false,
        },
        {
            "name": "mothersMaidenName",
            "optional": true,
        },
        {
            "name": "dateTimeOfBirth",
            "optional": true,
        },
        {
            "name": "administrativeSex",
            "optional": true,
        },
        {
            "name": "patientAlias",
            "optional": true,
        },
        {
            "name": "race",
            "optional": true,
        },
        {
            "name": "patientAddress",
            "optional": true,
        },
        {
            "name": "countyCode",
            "optional": true,
        },
        {
            "name": "phoneNumberHome",
            "optional": true,
        },
        {
            "name": "phoneNumberBusiness",
            "optional": true,
        },
        {
            "name": "primaryLanguage",
            "optional": true,
        },
        {
            "name": "maritalStatus",
            "optional": true,
        },
        {
            "name": "religion",
            "optional": true,
        },
        {
            "name": "patientAccountNumber",
            "optional": true,
        },
        {
            "name": "ssnNumberPatient",
            "optional": true,
        },
        {
            "name": "driversLicenseNumberPatient",
            "optional": true,
        },
        {
            "name": "mothersIdentifier",
            "optional": true,
        },
        {
            "name": "ethnicGroup",
            "optional": true,
        },
        {
            "name": "birthPlace",
            "optional": true,
        },
        {
            "name": "multipleBirthIndicator",
            "optional": true,
        },
        {
            "name": "birthOrder",
            "optional": true,
        },
        {
            "name": "citizenship",
            "optional": true,
        },
        {
            "name": "veteransMilitaryStatus",
            "optional": true,
        },
        {
            "name": "nationality",
            "optional": true,
        },
        {
            "name": "patientDeathDateAndTime",
            "optional": true,
        },
        {
            "name": "patientDeathIndicator",
            "optional": true,
        },
        {
            "name": "identityUnknownIndicator",
            "optional": true,
        },
        {
            "name": "identityReliabilityCode",
            "optional": true,
        },
        {
            "name": "lastUpdateDateTime",
            "optional": true,
        },
        {
            "name": "lastUpdateFacility",
            "optional": true,
        },
        {
            "name": "speciesCode",
            "optional": true,
        },
        {
            "name": "breedCode",
            "optional": true,
        },
        {
            "name": "strain",
            "optional": true,
        },
        {
            "name": "productionClassCode",
            "optional": true,
        },
        {
            "name": "tribalCitizenship",
            "optional": true,
        },
    ],
    "PR1": [
        {
            "name": "setIdPr1",
            "optional": false,
        },
        {
            "name": "procedureCodingMethod",
            "optional": true,
        },
        {
            "name": "procedureCode",
            "optional": false,
        },
        {
            "name": "procedureDescription",
            "optional": true,
        },
        {
            "name": "procedureDateTime",
            "optional": false,
        },
        {
            "name": "procedureFunctionalType",
            "optional": true,
        },
        {
            "name": "procedureMinutes",
            "optional": true,
        },
        {
            "name": "anesthesiologist",
            "optional": true,
        },
        {
            "name": "anesthesiaCode",
            "optional": true,
        },
        {
            "name": "anesthesiaMinutes",
            "optional": true,
        },
        {
            "name": "surgeon",
            "optional": true,
        },
        {
            "name": "procedurePractitioner",
            "optional": true,
        },
        {
            "name": "consentCode",
            "optional": true,
        },
        {
            "name": "procedurePriority",
            "optional": true,
        },
        {
            "name": "associatedDiagnosisCode",
            "optional": true,
        },
        {
            "name": "procedureCodeModifier",
            "optional": true,
        },
        {
            "name": "procedureDrgType",
            "optional": true,
        },
        {
            "name": "tissueTypeCode",
            "optional": true,
        },
        {
            "name": "procedureIdentifier",
            "optional": true,
        },
        {
            "name": "procedureActionCode",
            "optional": true,
        },
    ],
    "PRA": [
        {
            "name": "primaryKeyValuePra",
            "optional": true,
        },
        {
            "name": "practitionerGroup",
            "optional": true,
        },
        {
            "name": "practitionerCategory",
            "optional": true,
        },
        {
            "name": "providerBilling",
            "optional": true,
        },
        {
            "name": "specialty",
            "optional": true,
        },
        {
            "name": "practitionerIdNumbers",
            "optional": true,
        },
        {
            "name": "privileges",
            "optional": true,
        },
        {
            "name": "dateEnteredPractice",
            "optional": true,
        },
        {
            "name": "institution",
            "optional": true,
        },
        {
            "name": "dateLeftPractice",
            "optional": true,
        },
        {
            "name": "governmentReimbursementBillingEligibility",
            "optional": true,
        },
        {
            "name": "setIdPra",
            "optional": true,
        },
    ],
    "PRB": [
        {
            "name": "actionCode",
            "optional": false,
        },
        {
            "name": "actionDateTime",
            "optional": false,
        },
        {
            "name": "problemId",
            "optional": false,
        },
        {
            "name": "problemInstanceId",
            "optional": false,
        },
        {
            "name": "episodeOfCareId",
            "optional": true,
        },
        {
            "name": "problemListPriority",
            "optional": true,
        },
        {
            "name": "problemEstablishedDateTime",
            "optional": true,
        },
        {
            "name": "anticipatedProblemResolutionDateTime",
            "optional": true,
        },
        {
            "name": "actualProblemResolutionDateTime",
            "optional": true,
        },
        {
            "name": "problemClassification",
            "optional": true,
        },
        {
            "name": "problemManagementDiscipline",
            "optional": true,
        },
        {
            "name": "problemPersistence",
            "optional": true,
        },
        {
            "name": "problemConfirmationStatus",
            "optional": true,
        },
        {
            "name": "problemLifeCycleStatus",
            "optional": true,
        },
        {
            "name": "problemLifeCycleStatusDateTime",
            "optional": true,
        },
        {
            "name": "problemDateOfOnset",
            "optional": true,
        },
        {
            "name": "problemOnsetText",
            "optional": true,
        },
        {
            "name": "problemRanking",
            "optional": true,
        },
        {
            "name": "certaintyOfProblem",
            "optional": true,
        },
        {
            "name": "probabilityOfProblem",
            "optional": true,
        },
        {
            "name": "individualAwarenessOfProblem",
            "optional": true,
        },
        {
            "name": "problemPrognosis",
            "optional": true,
        },
        {
            "name": "individualAwarenessOfPrognosis",
            "optional": true,
        },
        {
            "name": "familySignificantOtherAwarenessOfProblemPrognosis",
            "optional": true,
        },
        {
            "name": "securitySensitivity",
            "optional": true,
        },
    ],
    "PRC": [
        {
            "name": "primaryKeyValuePrc",
            "optional": false,
        },
        {
            "name": "facilityIdPrc",
            "optional": true,
        },
        {
            "name": "department",
            "optional": true,
        },
        {
            "name": "validPatientClasses",
            "optional": true,
        },
        {
            "name": "price",
            "optional": true,
        },
        {
            "name": "formula",
            "optional": true,
        },
        {
            "name": "minimumQuantity",
            "optional": true,
        },
        {
            "name": "maximumQuantity",
            "optional": true,
        },
        {
            "name": "minimumPrice",
            "optional": true,
        },
        {
            "name": "maximumPrice",
            "optional": true,
        },
        {
            "name": "effectiveStartDate",
            "optional": true,
        },
        {
            "name": "effectiveEndDate",
            "optional": true,
        },
        {
            "name": "priceOverrideFlag",
            "optional": true,
        },
        {
            "name": "billingCategory",
            "optional": true,
        },
        {
            "name": "chargeableFlag",
            "optional": true,
        },
        {
            "name": "activeInactiveFlag",
            "optional": true,
        },
        {
            "name": "cost",
            "optional": true,
        },
        {
            "name": "chargeOnIndicator",
            "optional": true,
        },
    ],
    "PRD": [
        {
            "name": "providerRole",
            "optional": false,
        },
        {
            "name": "providerName",
            "optional": true,
        },
        {
            "name": "providerAddress",
            "optional": true,
        },
        {
            "name": "providerLocation",
            "optional": true,
        },
        {
            "name": "providerCommunicationInformation",
            "optional": true,
        },
        {
            "name": "preferredMethodOfContact",
            "optional": true,
        },
        {
            "name": "providerIdentifiers",
            "optional": true,
        },
        {
            "name": "effectiveStartDateOfProviderRole",
            "optional": true,
        },
        {
            "name": "effectiveEndDateOfProviderRole",
            "optional": true,
        },
    ],
    "PSH": [
        {
            "name": "reportType",
            "optional": false,
        },
        {
            "name": "reportFormIdentifier",
            "optional": true,
        },
        {
            "name": "reportDate",
            "optional": false,
        },
        {
            "name": "reportIntervalStartDate",
            "optional": true,
        },
        {
            "name": "reportIntervalEndDate",
            "optional": true,
        },
        {
            "name": "quantityManufactured",
            "optional": true,
        },
        {
            "name": "quantityDistributed",
            "optional": true,
        },
        {
            "name": "quantityDistributedMethod",
            "optional": true,
        },
        {
            "name": "quantityDistributedComment",
            "optional": true,
        },
        {
            "name": "quantityInUse",
            "optional": true,
        },
        {
            "name": "quantityInUseMethod",
            "optional": true,
        },
        {
            "name": "quantityInUseComment",
            "optional": true,
        },
        {
            "name": "numberOfProductExperienceReportsFiledByFacility",
            "optional": true,
        },
        {
            "name": "numberOfProductExperienceReportsFiledByDistributor",
            "optional": true,
        },
    ],
    "PTH": [
        {
            "name": "actionCode",
            "optional": false,
        },
        {
            "name": "pathwayId",
            "optional": false,
        },
        {
            "name": "pathwayInstanceId",
            "optional": false,
        },
        {
            "name": "pathwayEstablishedDateTime",
            "optional": false,
        },
        {
            "name": "pathwayLifeCycleStatus",
            "optional": true,
        },
        {
            "name": "changePathwayLifeCycleStatusDateTime",
            "optional": true,
        },
    ],
    "PV1": [
        {
            "name": "setIdPv1",
            "optional": true,
        },
        {
            "name": "patientClass",
            "optional": false,
        },
        {
            "name": "assignedPatientLocation",
            "optional": true,
        },
        {
            "name": "admissionType",
            "optional": true,
        },
        {
            "name": "preadmitNumber",
            "optional": true,
        },
        {
            "name": "priorPatientLocation",
            "optional": true,
        },
        {
            "name": "attendingDoctor",
            "optional": true,
        },
        {
            "name": "referringDoctor",
            "optional": true,
        },
        {
            "name": "consultingDoctor",
            "optional": true,
        },
        {
            "name": "hospitalService",
            "optional": true,
        },
        {
            "name": "temporaryLocation",
            "optional": true,
        },
        {
            "name": "preadmitTestIndicator",
            "optional": true,
        },
        {
            "name": "reAdmissionIndicator",
            "optional": true,
        },
        {
            "name": "admitSource",
            "optional": true,
        },
        {
            "name": "ambulatoryStatus",
            "optional": true,
        },
        {
            "name": "vipIndicator",
            "optional": true,
        },
        {
            "name": "admittingDoctor",
            "optional": true,
        },
        {
            "name": "patientType",
            "optional": true,
        },
        {
            "name": "visitNumber",
            "optional": true,
        },
        {
            "name": "financialClass",
            "optional": true,
        },
        {
            "name": "chargePriceIndicator",
            "optional": true,
        },
        {
            "name": "courtesyCode",
            "optional": true,
        },
        {
            "name": "creditRating",
            "optional": true,
        },
        {
            "name": "contractCode",
            "optional": true,
        },
        {
            "name": "contractEffectiveDate",
            "optional": true,
        },
        {
            "name": "contractAmount",
            "optional": true,
        },
        {
            "name": "contractPeriod",
            "optional": true,
        },
        {
            "name": "interestCode",
            "optional": true,
        },
        {
            "name": "transferToBadDebtCode",
            "optional": true,
        },
        {
            "name": "transferToBadDebtDate",
            "optional": true,
        },
        {
            "name": "badDebtAgencyCode",
            "optional": true,
        },
        {
            "name": "badDebtTransferAmount",
            "optional": true,
        },
        {
            "name": "badDebtRecoveryAmount",
            "optional": true,
        },
        {
            "name": "deleteAccountIndicator",
            "optional": true,
        },
        {
            "name": "deleteAccountDate",
            "optional": true,
        },
        {
            "name": "dischargeDisposition",
            "optional": true,
        },
        {
            "name": "dischargedToLocation",
            "optional": true,
        },
        {
            "name": "dietType",
            "optional": true,
        },
        {
            "name": "servicingFacility",
            "optional": true,
        },
        {
            "name": "bedStatus",
            "optional": true,
        },
        {
            "name": "accountStatus",
            "optional": true,
        },
        {
            "name": "pendingLocation",
            "optional": true,
        },
        {
            "name": "priorTemporaryLocation",
            "optional": true,
        },
        {
            "name": "admitDateTime",
            "optional": true,
        },
        {
            "name": "dischargeDateTime",
            "optional": true,
        },
        {
            "name": "currentPatientBalance",
            "optional": true,
        },
        {
            "name": "totalCharges",
            "optional": true,
        },
        {
            "name": "totalAdjustments",
            "optional": true,
        },
        {
            "name": "totalPayments",
            "optional": true,
        },
        {
            "name": "alternateVisitId",
            "optional": true,
        },
        {
            "name": "visitIndicator",
            "optional": true,
        },
        {
            "name": "otherHealthcareProvider",
            "optional": true,
        },
    ],
    "PV2": [
        {
            "name": "priorPendingLocation",
            "optional": true,
        },
        {
            "name": "accommodationCode",
            "optional": true,
        },
        {
            "name": "admitReason",
            "optional": true,
        },
        {
            "name": "transferReason",
            "optional": true,
        },
        {
            "name": "patientValuables",
            "optional": true,
        },
        {
            "name": "patientValuablesLocation",
            "optional": true,
        },
        {
            "name": "visitUserCode",
            "optional": true,
        },
        {
            "name": "expectedAdmitDateTime",
            "optional": true,
        },
        {
            "name": "expectedDischargeDateTime",
            "optional": true,
        },
        {
            "name": "estimatedLengthOfInpatientStay",
            "optional": true,
        },
        {
            "name": "actualLengthOfInpatientStay",
            "optional": true,
        },
        {
            "name": "visitDescription",
            "optional": true,
        },
        {
            "name": "referralSourceCode",
            "optional": true,
        },
        {
            "name": "previousServiceDate",
            "optional": true,
        },
        {
            "name": "employmentIllnessRelatedIndicator",
            "optional": true,
        },
        {
            "name": "purgeStatusCode",
            "optional": true,
        },
        {
            "name": "purgeStatusDate",
            "optional": true,
        },
        {
            "name": "specialProgramCode",
            "optional": true,
        },
        {
            "name": "retentionIndicator",
            "optional": true,
        },
        {
            "name": "expectedNumberOfInsurancePlans",
            "optional": true,
        },
        {
            "name": "visitPublicityCode",
            "optional": true,
        },
        {
            "name": "visitProtectionIndicator",
            "optional": true,
        },
        {
            "name": "clinicOrganizationName",
            "optional": true,
        },
        {
            "name": "patientStatusCode",
            "optional": true,
        },
        {
            "name": "visitPriorityCode",
            "optional": true,
        },
        {
            "name": "previousTreatmentDate",
            "optional": true,
        },
        {
            "name": "expectedDischargeDisposition",
            "optional": true,
        },
        {
            "name": "signatureOnFileDate",
            "optional": true,
        },
        {
            "name": "firstSimilarIllnessDate",
            "optional": true,
        },
        {
            "name": "patientChargeAdjustmentCode",
            "optional": true,
        },
        {
            "name": "recurringServiceCode",
            "optional": true,
        },
        {
            "name": "billingMediaCode",
            "optional": true,
        },
        {
            "name": "expectedSurgeryDateAndTime",
            "optional": true,
        },
        {
            "name": "militaryPartnershipCode",
            "optional": true,
        },
        {
            "name": "militaryNonAvailabilityCode",
            "optional": true,
        },
        {
            "name": "newbornBabyIndicator",
            "optional": true,
        },
        {
            "name": "babyDetainedIndicator",
            "optional": true,
        },
        {
            "name": "modeOfArrivalCode",
            "optional": true,
        },
        {
            "name": "recreationalDrugUseCode",
            "optional": true,
        },
        {
            "name": "admissionLevelOfCareCode",
            "optional": true,
        },
        {
            "name": "precautionCode",
            "optional": true,
        },
        {
            "name": "patientConditionCode",
            "optional": true,
        },
        {
            "name": "livingWillCode",
            "optional": true,
        },
        {
            "name": "organDonorCode",
            "optional": true,
        },
        {
            "name": "advanceDirectiveCode",
            "optional": true,
        },
        {
            "name": "patientStatusEffectiveDate",
            "optional": true,
        },
        {
            "name": "expectedLoaReturnDateTime",
            "optional": true,
        },
        {
            "name": "expectedPreAdmissionTestingDateTime",
            "optional": true,
        },
        {
            "name": "notifyClergyCode",
            "optional": true,
        },
    ],
    "QAK": [
        {
            "name": "queryTag",
            "optional": true,
        },
        {
            "name": "queryResponseStatus",
            "optional": true,
        },
        {
            "name": "messageQueryName",
            "optional": true,
        },
        {
            "name": "hitCount",
            "optional": true,
        },
        {
            "name": "thisPayload",
            "optional": true,
        },
        {
            "name": "hitsRemaining",
            "optional": true,
        },
    ],
    "QID": [
        {
            "name": "queryTag",
            "optional": false,
        },
        {
            "name": "messageQueryName",
            "optional": false,
        },
    ],
    "QPD": [
        {
            "name": "messageQueryName",
            "optional": false,
        },
        {
            "name": "queryTag",
            "optional": true,
        },
        {
            "name": "userParameters",
            "optional": true,
        },
    ],
    "QRD": [
        {
            "name": "queryDateTime",
            "optional": false,
        },
        {
            "name": "queryFormatCode",
            "optional": false,
        },
        {
            "name": "queryPriority",
            "optional": false,
        },
        {
            "name": "queryId",
            "optional": false,
        },
        {
            "name": "deferredResponseType",
            "optional": true,
        },
        {
            "name": "deferredResponseDateTime",
            "optional": true,
        },
        {
            "name": "quantityLimitedRequest",
            "optional": false,
        },
        {
            "name": "whoSubjectFilter",
            "optional": false,
        },
        {
            "name": "whatSubjectFilter",
            "optional": false,
        },
        {
            "name": "whatDepartmentDataCode",
            "optional": false,
        },
        {
            "name": "whatDataCodeValueQual",
            "optional": true,
        },
        {
            "name": "queryResultsLevel",
            "optional": true,
        },
    ],
    "QRF": [
        {
            "name": "whereSubjectFilter",
            "optional": false,
        },
        {
            "name": "whenDataStartDateTime",
            "optional": true,
        },
        {
            "name": "whenDataEndDateTime",
            "optional": true,
        },
        {
            "name": "whatUserQualifier",
            "optional": true,
        },
        {
            "name": "otherQrySubjectFilter",
            "optional": true,
        },
        {
            "name": "whichDateTimeQualifier",
            "optional": true,
        },
        {
            "name": "whichDateTimeStatusQualifier",
            "optional": true,
        },
        {
            "name": "dateTimeSelectionQualifier",
            "optional": true,
        },
        {
            "name": "whenQuantityTimingQualifier",
            "optional": true,
        },
        {
            "name": "searchConfidenceThreshold",
            "optional": true,
        },
    ],
    "QRI": [
        {
            "name": "candidateConfidence",
            "optional": true,
        },
        {
            "name": "matchReasonCode",
            "optional": true,
        },
        {
            "name": "algorithmDescriptor",
            "optional": true,
        },
    ],
    "RCP": [
        {
            "name": "queryPriority",
            "optional": true,
        },
        {
            "name": "quantityLimitedRequest",
            "optional": true,
        },
        {
            "name": "responseModality",
            "optional": true,
        },
        {
            "name": "executionAndDeliveryTime",
            "optional": true,
        },
        {
            "name": "modifyIndicator",
            "optional": true,
        },
        {
            "name": "sortByField",
            "optional": true,
        },
        {
            "name": "segmentGroupInclusion",
            "optional": true,
        },
    ],
    "RDF": [
        {
            "name": "numberOfColumnsPerRow",
            "optional": false,
        },
        {
            "name": "columnDescription",
            "optional": false,
        },
    ],
    "RDT": [
        {
            "name": "columnValue",
            "optional": false,
        },
    ],
    "RF1": [
        {
            "name": "referralStatus",
            "optional": true,
        },
        {
            "name": "referralPriority",
            "optional": true,
        },
        {
            "name": "referralType",
            "optional": true,
        },
        {
            "name": "referralDisposition",
            "optional": true,
        },
        {
            "name": "referralCategory",
            "optional": true,
        },
        {
            "name": "originatingReferralIdentifier",
            "optional": false,
        },
        {
            "name": "effectiveDate",
            "optional": true,
        },
        {
            "name": "expirationDate",
            "optional": true,
        },
        {
            "name": "processDate",
            "optional": true,
        },
        {
            "name": "referralReason",
            "optional": true,
        },
        {
            "name": "externalReferralIdentifier",
            "optional": true,
        },
    ],
    "RGS": [
        {
            "name": "setIdRgs",
            "optional": false,
        },
        {
            "name": "segmentActionCode",
            "optional": true,
        },
        {
            "name": "resourceGroupId",
            "optional": true,
        },
    ],
    "RMI": [
        {
            "name": "riskManagementIncidentCode",
            "optional": true,
        },
        {
            "name": "dateTimeIncident",
            "optional": true,
        },
        {
            "name": "incidentTypeCode",
            "optional": true,
        },
    ],
    "ROL": [
        {
            "name": "roleInstanceId",
            "optional": true,
        },
        {
            "name": "actionCode",
            "optional": false,
        },
        {
            "name": "roleRol",
            "optional": false,
        },
        {
            "name": "rolePerson",
            "optional": false,
        },
        {
            "name": "roleBeginDateTime",
            "optional": true,
        },
        {
            "name": "roleEndDateTime",
            "optional": true,
        },
        {
            "name": "roleDuration",
            "optional": true,
        },
        {
            "name": "roleActionReason",
            "optional": true,
        },
        {
            "name": "providerType",
            "optional": true,
        },
        {
            "name": "organizationUnitType",
            "optional": true,
        },
        {
            "name": "officeHomeAddressBirthplace",
            "optional": true,
        },
        {
            "name": "phone",
            "optional": true,
        },
    ],
    "RQ1": [
        {
            "name": "anticipatedPrice",
            "optional": true,
        },
        {
            "name": "manufacturerIdentifier",
            "optional": true,
        },
        {
            "name": "manufacturersCatalog",
            "optional": true,
        },
        {
            "name": "vendorId",
            "optional": true,
        },
        {
            "name": "vendorCatalog",
            "optional": true,
        },
        {
            "name": "taxable",
            "optional": true,
        },
        {
            "name": "substituteAllowed",
            "optional": true,
        },
    ],
    "RQD": [
        {
            "name": "requisitionLineNumber",
            "optional": true,
        },
        {
            "name": "itemCodeInternal",
            "optional": true,
        },
        {
            "name": "itemCodeExternal",
            "optional": true,
        },
        {
            "name": "hospitalItemCode",
            "optional": true,
        },
        {
            "name": "requisitionQuantity",
            "optional": true,
        },
        {
            "name": "requisitionUnitOfMeasure",
            "optional": true,
        },
        {
            "name": "deptCostCenter",
            "optional": true,
        },
        {
            "name": "itemNaturalAccountCode",
            "optional": true,
        },
        {
            "name": "deliverToId",
            "optional": true,
        },
        {
            "name": "dateNeeded",
            "optional": true,
        },
    ],
    "RXA": [
        {
            "name": "giveSubIdCounter",
            "optional": false,
        },
        {
            "name": "administrationSubIdCounter",
            "optional": false,
        },
        {
            "name": "dateTimeStartOfAdministration",
            "optional": false,
        },
        {
            "name": "dateTimeEndOfAdministration",
            "optional": false,
        },
        {
            "name": "administeredCode",
            "optional": false,
        },
        {
            "name": "administeredAmount",
            "optional": false,
        },
        {
            "name": "administeredUnits",
            "optional": true,
        },
        {
            "name": "administeredDosageForm",
            "optional": true,
        },
        {
            "name": "administrationNotes",
            "optional": true,
        },
        {
            "name": "administeringProvider",
            "optional": true,
        },
        {
            "name": "administeredAtLocation",
            "optional": true,
        },
        {
            "name": "administeredPer",
            "optional": true,
        },
        {
            "name": "administeredStrength",
            "optional": true,
        },
        {
            "name": "administeredStrengthUnits",
            "optional": true,
        },
        {
            "name": "substanceLotNumber",
            "optional": true,
        },
        {
            "name": "substanceExpirationDate",
            "optional": true,
        },
        {
            "name": "substanceManufacturerName",
            "optional": true,
        },
        {
            "name": "substanceTreatmentRefusalReason",
            "optional": true,
        },
        {
            "name": "indication",
            "optional": true,
        },
        {
            "name": "completionStatus",
            "optional": true,
        },
        {
            "name": "actionCodeRxa",
            "optional": true,
        },
        {
            "name": "systemEntryDateTime",
            "optional": true,
        },
        {
            "name": "administeredDrugStrengthVolume",
            "optional": true,
        },
        {
            "name": "administeredDrugStrengthVolumeUnits",
            "optional": true,
        },
        {
            "name": "administeredBarcodeIdentifier",
            "optional": true,
        },
        {
            "name": "pharmacyOrderType",
            "optional": true,
        },
    ],
    "RXC": [
        {
            "name": "rxComponentType",
            "optional": false,
        },
        {
            "name": "componentCode",
            "optional": false,
        },
        {
            "name": "componentAmount",
            "optional": false,
        },
        {
            "name": "componentUnits",
            "optional": false,
        },
        {
            "name": "componentStrength",
            "optional": true,
        },
        {
            "name": "componentStrengthUnits",
            "optional": true,
        },
        {
            "name": "supplementaryCode",
            "optional": true,
        },
        {
            "name": "componentDrugStrengthVolume",
            "optional": true,
        },
        {
            "name": "componentDrugStrengthVolumeUnits",
            "optional": true,
        },
    ],
    "RXD": [
        {
            "name": "dispenseSubIdCounter",
            "optional": false,
        },
        {
            "name": "dispenseGiveCode",
            "optional": false,
        },
        {
            "name": "dateTimeDispensed",
            "optional": false,
        },
        {
            "name": "actualDispenseAmount",
            "optional": false,
        },
        {
            "name": "actualDispenseUnits",
            "optional": true,
        },
        {
            "name": "actualDosageForm",
            "optional": true,
        },
        {
            "name": "prescriptionNumber",
            "optional": false,
        },
        {
            "name": "numberOfRefillsRemaining",
            "optional": true,
        },
        {
            "name": "dispenseNotes",
            "optional": true,
        },
        {
            "name": "dispensingProvider",
            "optional": true,
        },
        {
            "name": "substitutionStatus",
            "optional": true,
        },
        {
            "name": "totalDailyDose",
            "optional": true,
        },
        {
            "name": "dispenseToLocation",
            "optional": true,
        },
        {
            "name": "needsHumanReview",
            "optional": true,
        },
        {
            "name": "pharmacyTreatmentSuppliersSpecialDispensingInstructions",
            "optional": true,
        },
        {
            "name": "actualStrength",
            "optional": true,
        },
        {
            "name": "actualStrengthUnit",
            "optional": true,
        },
        {
            "name": "substanceLotNumber",
            "optional": true,
        },
        {
            "name": "substanceExpirationDate",
            "optional": true,
        },
        {
            "name": "substanceManufacturerName",
            "optional": true,
        },
        {
            "name": "indication",
            "optional": true,
        },
        {
            "name": "dispensePackageSize",
            "optional": true,
        },
        {
            "name": "dispensePackageSizeUnit",
            "optional": true,
        },
        {
            "name": "dispensePackageMethod",
            "optional": true,
        },
        {
            "name": "supplementaryCode",
            "optional": true,
        },
        {
            "name": "initiatingLocation",
            "optional": true,
        },
        {
            "name": "packagingAssemblyLocation",
            "optional": true,
        },
        {
            "name": "actualDrugStrengthVolume",
            "optional": true,
        },
        {
            "name": "actualDrugStrengthVolumeUnits",
            "optional": true,
        },
        {
            "name": "dispenseToPharmacy",
            "optional": true,
        },
        {
            "name": "dispenseToPharmacyAddress",
            "optional": true,
        },
        {
            "name": "pharmacyOrderType",
            "optional": true,
        },
        {
            "name": "dispenseType",
            "optional": true,
        },
    ],
    "RXE": [
        {
            "name": "quantityTiming",
            "optional": true,
        },
        {
            "name": "giveCode",
            "optional": false,
        },
        {
            "name": "giveAmountMinimum",
            "optional": false,
        },
        {
            "name": "giveAmountMaximum",
            "optional": true,
        },
        {
            "name": "giveUnits",
            "optional": false,
        },
        {
            "name": "giveDosageForm",
            "optional": true,
        },
        {
            "name": "providersAdministrationInstructions",
            "optional": true,
        },
        {
            "name": "deliverToLocation",
            "optional": true,
        },
        {
            "name": "substitutionStatus",
            "optional": true,
        },
        {
            "name": "dispenseAmount",
            "optional": true,
        },
        {
            "name": "dispenseUnits",
            "optional": true,
        },
        {
            "name": "numberOfRefills",
            "optional": true,
        },
        {
            "name": "orderingProvidersDeaNumber",
            "optional": true,
        },
        {
            "name": "pharmacistTreatmentSuppliersVerifierId",
            "optional": true,
        },
        {
            "name": "prescriptionNumber",
            "optional": true,
        },
        {
            "name": "numberOfRefillsRemaining",
            "optional": true,
        },
        {
            "name": "numberOfRefillsDosesDispensed",
            "optional": true,
        },
        {
            "name": "dTOfMostRecentRefillOrDoseDispensed",
            "optional": true,
        },
        {
            "name": "totalDailyDose",
            "optional": true,
        },
        {
            "name": "needsHumanReview",
            "optional": true,
        },
        {
            "name": "pharmacyTreatmentSuppliersSpecialDispensingInstructions",
            "optional": true,
        },
        {
            "name": "givePer",
            "optional": true,
        },
        {
            "name": "giveRateAmount",
            "optional": true,
        },
        {
            "name": "giveRateUnits",
            "optional": true,
        },
        {
            "name": "giveStrength",
            "optional": true,
        },
        {
            "name": "giveStrengthUnits",
            "optional": true,
        },
        {
            "name": "giveIndication",
            "optional": true,
        },
        {
            "name": "dispensePackageSize",
            "optional": true,
        },
        {
            "name": "dispensePackageSizeUnit",
            "optional": true,
        },
        {
            "name": "dispensePackageMethod",
            "optional": true,
        },
        {
            "name": "supplementaryCode",
            "optional": true,
        },
        {
            "name": "originalOrderDateTime",
            "optional": true,
        },
        {
            "name": "giveDrugStrengthVolume",
            "optional": true,
        },
        {
            "name": "giveDrugStrengthVolumeUnits",
            "optional": true,
        },
        {
            "name": "controlledSubstanceSchedule",
            "optional": true,
        },
        {
            "name": "formularyStatus",
            "optional": true,
        },
        {
            "name": "pharmaceuticalSubstanceAlternative",
            "optional": true,
        },
        {
            "name": "pharmacyOfMostRecentFill",
            "optional": true,
        },
        {
            "name": "initialDispenseAmount",
            "optional": true,
        },
        {
            "name": "dispensingPharmacy",
            "optional": true,
        },
        {
            "name": "dispensingPharmacyAddress",
            "optional": true,
        },
        {
            "name": "deliverToPatientLocation",
            "optional": true,
        },
        {
            "name": "deliverToAddress",
            "optional": true,
        },
        {
            "name": "pharmacyOrderType",
            "optional": true,
        },
    ],
    "RXG": [
        {
            "name": "giveSubIdCounter",
            "optional": false,
        },
        {
            "name": "dispenseSubIdCounter",
            "optional": true,
        },
        {
            "name": "quantityTiming",
            "optional": true,
        },
        {
            "name": "giveCode",
            "optional": false,
        },
        {
            "name": "giveAmountMinimum",
            "optional": false,
        },
        {
            "name": "giveAmountMaximum",
            "optional": true,
        },
        {
            "name": "giveUnits",
            "optional": false,
        },
        {
            "name": "giveDosageForm",
            "optional": true,
        },
        {
            "name": "administrationNotes",
            "optional": true,
        },
        {
            "name": "substitutionStatus",
            "optional": true,
        },
        {
            "name": "dispenseToLocation",
            "optional": true,
        },
        {
            "name": "needsHumanReview",
            "optional": true,
        },
        {
            "name": "pharmacyTreatmentSuppliersSpecialAdministrationInstructions",
            "optional": true,
        },
        {
            "name": "givePer",
            "optional": true,
        },
        {
            "name": "giveRateAmount",
            "optional": true,
        },
        {
            "name": "giveRateUnits",
            "optional": true,
        },
        {
            "name": "giveStrength",
            "optional": true,
        },
        {
            "name": "giveStrengthUnits",
            "optional": true,
        },
        {
            "name": "substanceLotNumber",
            "optional": true,
        },
        {
            "name": "substanceExpirationDate",
            "optional": true,
        },
        {
            "name": "substanceManufacturerName",
            "optional": true,
        },
        {
            "name": "indication",
            "optional": true,
        },
        {
            "name": "giveDrugStrengthVolume",
            "optional": true,
        },
        {
            "name": "giveDrugStrengthVolumeUnits",
            "optional": true,
        },
        {
            "name": "giveBarcodeIdentifier",
            "optional": true,
        },
        {
            "name": "pharmacyOrderType",
            "optional": true,
        },
    ],
    "RXO": [
        {
            "name": "requestedGiveCode",
            "optional": true,
        },
        {
            "name": "requestedGiveAmountMinimum",
            "optional": true,
        },
        {
            "name": "requestedGiveAmountMaximum",
            "optional": true,
        },
        {
            "name": "requestedGiveUnits",
            "optional": true,
        },
        {
            "name": "requestedDosageForm",
            "optional": true,
        },
        {
            "name": "providersPharmacyTreatmentInstructions",
            "optional": true,
        },
        {
            "name": "providersAdministrationInstructions",
            "optional": true,
        },
        {
            "name": "deliverToLocation",
            "optional": true,
        },
        {
            "name": "allowSubstitutions",
            "optional": true,
        },
        {
            "name": "requestedDispenseCode",
            "optional": true,
        },
        {
            "name": "requestedDispenseAmount",
            "optional": true,
        },
        {
            "name": "requestedDispenseUnits",
            "optional": true,
        },
        {
            "name": "numberOfRefills",
            "optional": true,
        },
        {
            "name": "orderingProvidersDeaNumber",
            "optional": true,
        },
        {
            "name": "pharmacistTreatmentSuppliersVerifierId",
            "optional": true,
        },
        {
            "name": "needsHumanReview",
            "optional": true,
        },
        {
            "name": "requestedGivePer",
            "optional": true,
        },
        {
            "name": "requestedGiveStrength",
            "optional": true,
        },
        {
            "name": "requestedGiveStrengthUnits",
            "optional": true,
        },
        {
            "name": "indication",
            "optional": true,
        },
        {
            "name": "requestedGiveRateAmount",
            "optional": true,
        },
        {
            "name": "requestedGiveRateUnits",
            "optional": true,
        },
        {
            "name": "totalDailyDose",
            "optional": true,
        },
        {
            "name": "supplementaryCode",
            "optional": true,
        },
        {
            "name": "requestedDrugStrengthVolume",
            "optional": true,
        },
        {
            "name": "requestedDrugStrengthVolumeUnits",
            "optional": true,
        },
        {
            "name": "pharmacyOrderType",
            "optional": true,
        },
        {
            "name": "dispensingInterval",
            "optional": true,
        },
    ],
    "RXR": [
        {
            "name": "route",
            "optional": false,
        },
        {
            "name": "administrationSite",
            "optional": true,
        },
        {
            "name": "administrationDevice",
            "optional": true,
        },
        {
            "name": "administrationMethod",
            "optional": true,
        },
        {
            "name": "routingInstruction",
            "optional": true,
        },
        {
            "name": "administrationSiteModifier",
            "optional": true,
        },
    ],
    "SAC": [
        {
            "name": "externalAccessionIdentifier",
            "optional": true,
        },
        {
            "name": "accessionIdentifier",
            "optional": true,
        },
        {
            "name": "containerIdentifier",
            "optional": true,
        },
        {
            "name": "primaryContainerIdentifier",
            "optional": true,
        },
        {
            "name": "equipmentContainerIdentifier",
            "optional": true,
        },
        {
            "name": "specimenSource",
            "optional": true,
        },
        {
            "name": "registrationDateTime",
            "optional": true,
        },
        {
            "name": "containerStatus",
            "optional": true,
        },
        {
            "name": "carrierType",
            "optional": true,
        },
        {
            "name": "carrierIdentifier",
            "optional": true,
        },
        {
            "name": "positionInCarrier",
            "optional": true,
        },
        {
            "name": "trayTypeSac",
            "optional": true,
        },
        {
            "name": "trayIdentifier",
            "optional": true,
        },
        {
            "name": "positionInTray",
            "optional": true,
        },
        {
            "name": "location",
            "optional": true,
        },
        {
            "name": "containerHeight",
            "optional": true,
        },
        {
            "name": "containerDiameter",
            "optional": true,
        },
        {
            "name": "barrierDelta",
            "optional": true,
        },
        {
            "name": "bottomDelta",
            "optional": true,
        },
        {
            "name": "containerHeightDiameterDeltaUnits",
            "optional": true,
        },
        {
            "name": "containerVolume",
            "optional": true,
        },
        {
            "name": "availableSpecimenVolume",
            "optional": true,
        },
        {
            "name": "initialSpecimenVolume",
            "optional": true,
        },
        {
            "name": "volumeUnits",
            "optional": true,
        },
        {
            "name": "separatorType",
            "optional": true,
        },
        {
            "name": "capType",
            "optional": true,
        },
        {
            "name": "additive",
            "optional": true,
        },
        {
            "name": "specimenComponent",
            "optional": true,
        },
        {
            "name": "dilutionFactor",
            "optional": true,
        },
        {
            "name": "treatment",
            "optional": true,
        },
        {
            "name": "temperature",
            "optional": true,
        },
        {
            "name": "hemolysisIndex",
            "optional": true,
        },
        {
            "name": "hemolysisIndexUnits",
            "optional": true,
        },
        {
            "name": "lipemiaIndex",
            "optional": true,
        },
        {
            "name": "lipemiaIndexUnits",
            "optional": true,
        },
        {
            "name": "icterusIndex",
            "optional": true,
        },
        {
            "name": "icterusIndexUnits",
            "optional": true,
        },
        {
            "name": "fibrinIndex",
            "optional": true,
        },
        {
            "name": "fibrinIndexUnits",
            "optional": true,
        },
        {
            "name": "systemInducedContaminants",
            "optional": true,
        },
        {
            "name": "drugInterference",
            "optional": true,
        },
        {
            "name": "artificialBlood",
            "optional": true,
        },
        {
            "name": "specialHandlingCode",
            "optional": true,
        },
        {
            "name": "otherEnvironmentalFactors",
            "optional": true,
        },
    ],
    "SCH": [
        {
            "name": "placerAppointmentId",
            "optional": true,
        },
        {
            "name": "fillerAppointmentId",
            "optional": true,
        },
        {
            "name": "occurrenceNumber",
            "optional": true,
        },
        {
            "name": "placerGroupNumber",
            "optional": true,
        },
        {
            "name": "scheduleId",
            "optional": true,
        },
        {
            "name": "eventReason",
            "optional": false,
        },
        {
            "name": "appointmentReason",
            "optional": true,
        },
        {
            "name": "appointmentType",
            "optional": true,
        },
        {
            "name": "appointmentDuration",
            "optional": true,
        },
        {
            "name": "appointmentDurationUnits",
            "optional": true,
        },
        {
            "name": "appointmentTimingQuantity",
            "optional": true,
        },
        {
            "name": "placerContactPerson",
            "optional": true,
        },
        {
            "name": "placerContactPhoneNumber",
            "optional": true,
        },
        {
            "name": "placerContactAddress",
            "optional": true,
        },
        {
            "name": "placerContactLocation",
            "optional": true,
        },
        {
            "name": "fillerContactPerson",
            "optional": false,
        },
        {
            "name": "fillerContactPhoneNumber",
            "optional": true,
        },
        {
            "name": "fillerContactAddress",
            "optional": true,
        },
        {
            "name": "fillerContactLocation",
            "optional": true,
        },
        {
            "name": "enteredByPerson",
            "optional": false,
        },
        {
            "name": "enteredByPhoneNumber",
            "optional": true,
        },
        {
            "name": "enteredByLocation",
            "optional": true,
        },
        {
            "name": "parentPlacerAppointmentId",
            "optional": true,
        },
        {
            "name": "parentFillerAppointmentId",
            "optional": true,
        },
        {
            "name": "fillerStatusCode",
            "optional": true,
        },
        {
            "name": "placerOrderNumber",
            "optional": true,
        },
        {
            "name": "fillerOrderNumber",
            "optional": true,
        },
    ],
    "SFT": [
        {
            "name": "softwareVendorOrganization",
            "optional": false,
        },
        {
            "name": "softwareCertifiedVersionOrReleaseNumber",
            "optional": false,
        },
        {
            "name": "softwareProductName",
            "optional": false,
        },
        {
            "name": "softwareBinaryId",
            "optional": false,
        },
        {
            "name": "softwareProductInformation",
            "optional": true,
        },
        {
            "name": "softwareInstallDate",
            "optional": true,
        },
    ],
    "SID": [
        {
            "name": "applicationMethodIdentifier",
            "optional": true,
        },
        {
            "name": "substanceLotNumber",
            "optional": true,
        },
        {
            "name": "substanceContainerIdentifier",
            "optional": true,
        },
        {
            "name": "substanceManufacturerIdentifier",
            "optional": true,
        },
    ],
    "SPM": [
        {
            "name": "setIdSpm",
            "optional": true,
        },
        {
            "name": "specimenId",
            "optional": true,
        },
        {
            "name": "specimenParentIDs",
            "optional": true,
        },
        {
            "name": "specimenType",
            "optional": false,
        },
        {
            "name": "specimenTypeModifier",
            "optional": true,
        },
        {
            "name": "specimenAdditives",
            "optional": true,
        },
        {
            "name": "specimenCollectionMethod",
            "optional": true,
        },
        {
            "name": "specimenSourceSite",
            "optional": true,
        },
        {
            "name": "specimenSourceSiteModifier",
            "optional": true,
        },
        {
            "name": "specimenCollectionSite",
            "optional": true,
        },
        {
            "name": "specimenRole",
            "optional": true,
        },
        {
            "name": "specimenCollectionAmount",
            "optional": true,
        },
        {
            "name": "groupedSpecimenCount",
            "optional": true,
        },
        {
            "name": "specimenDescription",
            "optional": true,
        },
        {
            "name": "specimenHandlingCode",
            "optional": true,
        },
        {
            "name": "specimenRiskCode",
            "optional": true,
        },
        {
            "name": "specimenCollectionDateTime",
            "optional": true,
        },
        {
            "name": "specimenReceivedDateTime",
            "optional": true,
        },
        {
            "name": "specimenExpirationDateTime",
            "optional": true,
        },
        {
            "name": "specimenAvailability",
            "optional": true,
        },
        {
            "name": "specimenRejectReason",
            "optional": true,
        },
        {
            "name": "specimenQuality",
            "optional": true,
        },
        {
            "name": "specimenAppropriateness",
            "optional": true,
        },
        {
            "name": "specimenCondition",
            "optional": true,
        },
        {
            "name": "specimenCurrentQuantity",
            "optional": true,
        },
        {
            "name": "numberOfSpecimenContainers",
            "optional": true,
        },
        {
            "name": "containerType",
            "optional": true,
        },
        {
            "name": "containerCondition",
            "optional": true,
        },
        {
            "name": "specimenChildRole",
            "optional": true,
        },
    ],
    "SPR": [
        {
            "name": "queryTag",
            "optional": true,
        },
        {
            "name": "queryResponseFormatCode",
            "optional": false,
        },
        {
            "name": "storedProcedureName",
            "optional": false,
        },
        {
            "name": "inputParameterList",
            "optional": true,
        },
    ],
    "STF": [
        {
            "name": "primaryKeyValueStf",
            "optional": true,
        },
        {
            "name": "staffIdentifierList",
            "optional": true,
        },
        {
            "name": "staffName",
            "optional": true,
        },
        {
            "name": "staffType",
            "optional": true,
        },
        {
            "name": "administrativeSex",
            "optional": true,
        },
        {
            "name": "dateTimeOfBirth",
            "optional": true,
        },
        {
            "name": "activeInactiveFlag",
            "optional": true,
        },
        {
            "name": "department",
            "optional": true,
        },
        {
            "name": "hospitalServiceStf",
            "optional": true,
        },
        {
            "name": "phone",
            "optional": true,
        },
        {
            "name": "officeHomeAddressBirthplace",
            "optional": true,
        },
        {
            "name": "institutionActivationDate",
            "optional": true,
        },
        {
            "name": "institutionInactivationDate",
            "optional": true,
        },
        {
            "name": "backupPersonId",
            "optional": true,
        },
        {
            "name": "eMailAddress",
            "optional": true,
        },
        {
            "name": "preferredMethodOfContact",
            "optional": true,
        },
        {
            "name": "maritalStatus",
            "optional": true,
        },
        {
            "name": "jobTitle",
            "optional": true,
        },
        {
            "name": "jobCodeClass",
            "optional": true,
        },
        {
            "name": "employmentStatusCode",
            "optional": true,
        },
        {
            "name": "additionalInsuredOnAuto",
            "optional": true,
        },
        {
            "name": "driversLicenseNumberStaff",
            "optional": true,
        },
        {
            "name": "copyAutoIns",
            "optional": true,
        },
        {
            "name": "autoInsExpires",
            "optional": true,
        },
        {
            "name": "dateLastDmvReview",
            "optional": true,
        },
        {
            "name": "dateNextDmvReview",
            "optional": true,
        },
        {
            "name": "race",
            "optional": true,
        },
        {
            "name": "ethnicGroup",
            "optional": true,
        },
        {
            "name": "reActivationApprovalIndicator",
            "optional": true,
        },
        {
            "name": "citizenship",
            "optional": true,
        },
        {
            "name": "deathDateAndTime",
            "optional": true,
        },
        {
            "name": "deathIndicator",
            "optional": true,
        },
        {
            "name": "institutionRelationshipTypeCode",
            "optional": true,
        },
        {
            "name": "institutionRelationshipPeriod",
            "optional": true,
        },
        {
            "name": "expectedReturnDate",
            "optional": true,
        },
        {
            "name": "costCenterCode",
            "optional": true,
        },
        {
            "name": "genericClassificationIndicator",
            "optional": true,
        },
        {
            "name": "inactiveReasonCode",
            "optional": true,
        },
    ],
    "TCC": [
        {
            "name": "universalServiceIdentifier",
            "optional": false,
        },
        {
            "name": "testApplicationIdentifier",
            "optional": false,
        },
        {
            "name": "specimenSource",
            "optional": true,
        },
        {
            "name": "autoDilutionFactorDefault",
            "optional": true,
        },
        {
            "name": "rerunDilutionFactorDefault",
            "optional": true,
        },
        {
            "name": "preDilutionFactorDefault",
            "optional": true,
        },
        {
            "name": "endogenousContentOfPreDilutionDiluent",
            "optional": true,
        },
        {
            "name": "inventoryLimitsWarningLevel",
            "optional": true,
        },
        {
            "name": "automaticRerunAllowed",
            "optional": true,
        },
        {
            "name": "automaticRepeatAllowed",
            "optional": true,
        },
        {
            "name": "automaticReflexAllowed",
            "optional": true,
        },
        {
            "name": "equipmentDynamicRange",
            "optional": true,
        },
        {
            "name": "units",
            "optional": true,
        },
        {
            "name": "processingType",
            "optional": true,
        },
    ],
    "TCD": [
        {
            "name": "universalServiceIdentifier",
            "optional": false,
        },
        {
            "name": "autoDilutionFactor",
            "optional": true,
        },
        {
            "name": "rerunDilutionFactor",
            "optional": true,
        },
        {
            "name": "preDilutionFactor",
            "optional": true,
        },
        {
            "name": "endogenousContentOfPreDilutionDiluent",
            "optional": true,
        },
        {
            "name": "automaticRepeatAllowed",
            "optional": true,
        },
        {
            "name": "reflexAllowed",
            "optional": true,
        },
        {
            "name": "analyteRepeatStatus",
            "optional": true,
        },
    ],
    "TQ1": [
        {
            "name": "setIdTq1",
            "optional": true,
        },
        {
            "name": "quantity",
            "optional": true,
        },
        {
            "name": "repeatPattern",
            "optional": true,
        },
        {
            "name": "explicitTime",
            "optional": true,
        },
        {
            "name": "relativeTimeAndUnits",
            "optional": true,
        },
        {
            "name": "serviceDuration",
            "optional": true,
        },
        {
            "name": "startDateTime",
            "optional": true,
        },
        {
            "name": "endDateTime",
            "optional": true,
        },
        {
            "name": "priority",
            "optional": true,
        },
        {
            "name": "conditionText",
            "optional": true,
        },
        {
            "name": "textInstruction",
            "optional": true,
        },
        {
            "name": "conjunction",
            "optional": true,
        },
        {
            "name": "occurrenceDuration",
            "optional": true,
        },
        {
            "name": "totalOccurrences",
            "optional": true,
        },
    ],
    "TQ2": [
        {
            "name": "setIdTq2",
            "optional": true,
        },
        {
            "name": "sequenceResultsFlag",
            "optional": true,
        },
        {
            "name": "relatedPlacerNumber",
            "optional": true,
        },
        {
            "name": "relatedFillerNumber",
            "optional": true,
        },
        {
            "name": "relatedPlacerGroupNumber",
            "optional": true,
        },
        {
            "name": "sequenceConditionCode",
            "optional": true,
        },
        {
            "name": "cyclicEntryExitIndicator",
            "optional": true,
        },
        {
            "name": "sequenceConditionTimeInterval",
            "optional": true,
        },
        {
            "name": "cyclicGroupMaximumNumberOfRepeats",
            "optional": true,
        },
        {
            "name": "specialServiceRequestRelationship",
            "optional": true,
        },
    ],
    "TXA": [
        {
            "name": "setIdTxa",
            "optional": false,
        },
        {
            "name": "documentType",
            "optional": false,
        },
        {
            "name": "documentContentPresentation",
            "optional": true,
        },
        {
            "name": "activityDateTime",
            "optional": true,
        },
        {
            "name": "primaryActivityProviderCodeName",
            "optional": true,
        },
        {
            "name": "originationDateTime",
            "optional": true,
        },
        {
            "name": "transcriptionDateTime",
            "optional": true,
        },
        {
            "name": "editDateTime",
            "optional": true,
        },
        {
            "name": "originatorCodeName",
            "optional": true,
        },
        {
            "name": "assignedDocumentAuthenticator",
            "optional": true,
        },
        {
            "name": "transcriptionistCodeName",
            "optional": true,
        },
        {
            "name": "uniqueDocumentNumber",
            "optional": false,
        },
        {
            "name": "parentDocumentNumber",
            "optional": true,
        },
        {
            "name": "placerOrderNumber",
            "optional": true,
        },
        {
            "name": "fillerOrderNumber",
            "optional": true,
        },
        {
            "name": "uniqueDocumentFileName",
            "optional": true,
        },
        {
            "name": "documentCompletionStatus",
            "optional": false,
        },
        {
            "name": "documentConfidentialityStatus",
            "optional": true,
        },
        {
            "name": "documentAvailabilityStatus",
            "optional": true,
        },
        {
            "name": "documentStorageStatus",
            "optional": true,
        },
        {
            "name": "documentChangeReason",
            "optional": true,
        },
        {
            "name": "authenticationPersonTimeStamp",
            "optional": true,
        },
        {
            "name": "distributedCopies",
            "optional": true,
        },
    ],
    "UB1": [
        {
            "name": "setIdUb1",
            "optional": true,
        },
        {
            "name": "bloodDeductible",
            "optional": true,
        },
        {
            "name": "bloodFurnishedPintsOf",
            "optional": true,
        },
        {
            "name": "bloodReplacedPints",
            "optional": true,
        },
        {
            "name": "bloodNotReplacedPints",
            "optional": true,
        },
        {
            "name": "coInsuranceDays",
            "optional": true,
        },
        {
            "name": "conditionCode",
            "optional": true,
        },
        {
            "name": "coveredDays",
            "optional": true,
        },
        {
            "name": "nonCoveredDays",
            "optional": true,
        },
        {
            "name": "valueAmountCode",
            "optional": true,
        },
        {
            "name": "numberOfGraceDays",
            "optional": true,
        },
        {
            "name": "specialProgramIndicator",
            "optional": true,
        },
        {
            "name": "psroUrApprovalIndicator",
            "optional": true,
        },
        {
            "name": "psroUrApprovedStayFm",
            "optional": true,
        },
        {
            "name": "psroUrApprovedStayTo",
            "optional": true,
        },
        {
            "name": "occurrence",
            "optional": true,
        },
        {
            "name": "occurrenceSpan",
            "optional": true,
        },
        {
            "name": "occurSpanStartDate",
            "optional": true,
        },
        {
            "name": "occurSpanEndDate",
            "optional": true,
        },
        {
            "name": "ub82Locator2",
            "optional": true,
        },
        {
            "name": "ub82Locator9",
            "optional": true,
        },
        {
            "name": "ub82Locator27",
            "optional": true,
        },
        {
            "name": "ub82Locator45",
            "optional": true,
        },
    ],
    "UB2": [
        {
            "name": "setIdUb2",
            "optional": true,
        },
        {
            "name": "coInsuranceDays",
            "optional": true,
        },
        {
            "name": "conditionCode",
            "optional": true,
        },
        {
            "name": "coveredDays",
            "optional": true,
        },
        {
            "name": "nonCoveredDays",
            "optional": true,
        },
        {
            "name": "valueAmountCode",
            "optional": true,
        },
        {
            "name": "occurrenceCodeDate",
            "optional": true,
        },
        {
            "name": "occurrenceSpanCodeDates",
            "optional": true,
        },
        {
            "name": "ub92Locator2",
            "optional": true,
        },
        {
            "name": "ub92Locator11",
            "optional": true,
        },
        {
            "name": "ub92Locator31",
            "optional": true,
        },
        {
            "name": "documentControlNumber",
            "optional": true,
        },
        {
            "name": "ub92Locator49",
            "optional": true,
        },
        {
            "name": "ub92Locator56",
            "optional": true,
        },
        {
            "name": "ub92Locator57",
            "optional": true,
        },
        {
            "name": "ub92Locator78",
            "optional": true,
        },
        {
            "name": "specialVisitCount",
            "optional": true,
        },
    ],
    "URD": [
        {
            "name": "rUDateTime",
            "optional": true,
        },
        {
            "name": "reportPriority",
            "optional": true,
        },
        {
            "name": "rUWhoSubjectDefinition",
            "optional": false,
        },
        {
            "name": "rUWhatSubjectDefinition",
            "optional": true,
        },
        {
            "name": "rUWhatDepartmentCode",
            "optional": true,
        },
        {
            "name": "rUDisplayPrintLocations",
            "optional": true,
        },
        {
            "name": "rUResultsLevel",
            "optional": true,
        },
    ],
    "URS": [
        {
            "name": "rUWhereSubjectDefinition",
            "optional": false,
        },
        {
            "name": "rUWhenDataStartDateTime",
            "optional": true,
        },
        {
            "name": "rUWhenDataEndDateTime",
            "optional": true,
        },
        {
            "name": "rUWhatUserQualifier",
            "optional": true,
        },
        {
            "name": "rUOtherResultsSubjectDefinition",
            "optional": true,
        },
        {
            "name": "rUWhichDateTimeQualifier",
            "optional": true,
        },
        {
            "name": "rUWhichDateTimeStatusQualifier",
            "optional": true,
        },
        {
            "name": "rUDateTimeSelectionQualifier",
            "optional": true,
        },
        {
            "name": "rUQuantityTimingQualifier",
            "optional": true,
        },
    ],
    "VAR": [
        {
            "name": "varianceInstanceId",
            "optional": false,
        },
        {
            "name": "documentedDateTime",
            "optional": false,
        },
        {
            "name": "statedVarianceDateTime",
            "optional": true,
        },
        {
            "name": "varianceOriginator",
            "optional": true,
        },
        {
            "name": "varianceClassification",
            "optional": true,
        },
        {
            "name": "varianceDescription",
            "optional": true,
        },
    ],
    "VTQ": [
        {
            "name": "queryTag",
            "optional": true,
        },
        {
            "name": "queryResponseFormatCode",
            "optional": false,
        },
        {
            "name": "vtQueryName",
            "optional": false,
        },
        {
            "name": "virtualTableName",
            "optional": false,
        },
        {
            "name": "selectionCriteria",
            "optional": true,
        },
    ]
};

var segmentNames_descriptive = {
    "ABS": "Abstract", "ACC": "Accident", "ADD": "Addendum", "AFF": "Professional Affiliation", "AIG": "Appointment Information _ General Resource", "AIL": "Appointment Information _ Location Resource",
    "AIP": "Appointment Information _ Personnel Resource", "AIS": "Appointment Information", "AL1": "Patient Allergy Information", "APR": "Appointment Preferences", "ARQ": "Appointment Request",
    "AUT": "Authorization Information", "BHS": "Batch Header", "BLC": "Blood Code", "BLG": "Billing", "BPO": "Blood product order", "BPX": "Blood product dispense status", "BTS": "Batch Trailer",
    "BTX": "Blood Product Transfusion/Disposition", "CDM": "Charge Description Master ", "CER": "Certificate Detail", "CM0": "Clinical Study Master", "CM1": "Clinical Study Phase Master",
    "CM2": "Clinical Study Schedule Master", "CNS": "Clear Notification", "CON": "Consent Segment", "CSP": "Clinical Study Phase", "CSR": "Clinical Study Registration", "CSS": "Clinical Study Data Schedule Segment",
    "CTD": "Contact Data", "CTI": "Clinical Trial Identification", "DB1": "Disability", "DG1": "Diagnosis", "DRG": "Diagnosis Related Group", "DSC": "Continuation Pointer", "DSP": "Display Data", "ECD": "Equipment Command",
    "ECR": "Equipment Command Response", "EDU": "Educational Detail", "EQL": "Embedded Query Language", "EQP": "Equipment/log Service", "EQU": "Equipment Detail", "ERQ": "Event replay query", "ERR": "Error",
    "EVN": "Event Type", "FAC": "Facility", "FHS": "File Header", "FT1": "Financial Transaction", "FTS": "File Trailer", "GOL": "Goal Detail", "GP1": "Grouping/Reimbursement - Visit", 
    "GP2": "Grouping/Reimbursement - Procedure Line Item", "GT1": "Guarantor", "IAM": "Patient Adverse Reaction Information", "IIM": "Inventory Item Master", "IN1": "Insurance", "IN2": "Insurance Additional Information",
    "IN3": "Insurance Additional Information, Certification ", "INV": "Inventory Detail", "IPC": "Imaging Procedure Control Segment", "ISD": "Interaction Status Detail", "LAN": "Language Detail", "LCC": "Location Charge Code",
    "LCH": "Location Characteristic", "LDP": "Location Department", "LOC": "Location Identification", "LRL": "Location Relationship", "MFA": "Master File Acknowledgment", "MFE": "Master File Entry",
    "MFI": "Master File Identification", "MRG": "Merge Patient Information", "MSA": "Message Acknowledgment", "MSH": "Message Header", "NCK": "System Clock", "NDS": "Notification Detail",
    "NK1": "Next of Kin / Associated Parties", "NPU": "Bed Status Update", "NSC": "Application Status Change", "NST": "Application control level statistics", "NTE": "Notes and Comments", "OBR": "Observation Request",
    "OBX": "Observation/Result", "ODS": "Dietary Orders, Supplements, and Preferences", "ODT": "Diet Tray Instructions", "OM1": "General Segment", "OM2": "Numeric Observation", "OM3": "Categorical Service/Test/Observation",
    "OM4": "Observations that Require Specimens", "OM5": "Observation Batteries (Sets)", "OM6": "Observations that are Calculated from Other Observations", "OM7": "Additional Basic Attributes", "ORC": "Common Order",
    "ORG": "Practitioner Organization Unit", "OVR": "Override Segment", "PCR": "Possible Causal Relationship", "PD1": "Patient Additional Demographic ", "PDA": "Patient Death and Autopsy", "PDC": "Product Detail Country",
    "PEO": "Product Experience Observation", "PES": "Product Experience Sender", "PID": "Patient Identification", "PR1": "Procedures", "PRA": "Practitioner Detail", "PRB": "Problem Details", "PRC": "Pricing",
    "PRD": "Provider Data", "PSH": "Product Summary Header", "PTH": "Pathway", "PV1": "Patient Visit", "PV2": "Patient Visit - Additional Information", "QAK": "Query Acknowledgment", "QID": "Query Identification",
    "QPD": "Query Parameter Definition", "QRD": "Original-Style Query Definition", "QRF": "Original style query filter", "QRI": "Query Response Instance", "RCP": "Response Control Parameter",
    "RDF": "Table Row Definition", "RDT": "Table Row Data", "RF1": "Referral Information", "RGS": "Resource Group", "RMI": "Risk Management Incident", "ROL": "Role", "RQ1": "Requisition Detail-1",
    "RQD": "Requisition Detail", "RXA": "Pharmacy/Treatment Administration", "RXC": "Pharmacy/Treatment Component Order", "RXD": "Pharmacy/Treatment Dispense", "RXE": "Pharmacy/Treatment Encoded Order",
    "RXG": "Pharmacy/Treatment Give", "RXO": "Pharmacy/Treatment Order", "RXR": "Pharmacy/Treatment Route", "SAC": "Specimen Container detail", "SCH": "Scheduling Activity Information ", "SFT": "Software Segment",
    "SID": "Substance Identifier",  "SPM": "Specimen", "SPR": "Stored Procedure Request Definition", "STF": "Staff Identification", "TCC": "Test Code Configuration", "TCD": "Test Code Detail", "TQ1": "Timing/Quantity",
    "TQ2": "Timing/Quantity Relationship", "TXA": "Transcription Document Header", "UB1": "UB82", "UB2": "UB92 Data", "URD": "Results/update Definition", "URS": "Unsolicited Selection", "VAR": "Variance",
    "VTQ": "Virtual Table Query Request"
};

/****** END: MESSAGE TEMPS ************/

var segmentNames = Object.keys(messageTemplates).filter(function(componentTitle) {
    return new RegExp(/^[A-Z0-9]{3}$/).test(componentTitle);
});

var treeData = [];
segmentNames.forEach(function(segName) {
    var segObj = {
        "key": segName,
        "title": segName + "<span class='h5'><small> / " + segmentNames_descriptive[segName] + "</small></span>",
        "children": [],
        "folder": true
    };
    
    messageTemplates[segName].forEach(function(field, idx) {
        var fieldObj, optional, repeatable;
        if(messageTemplates[field]) {
             fieldObj = {
                "key": field,
                "title": segName + "." + ( idx + 1 ) + " " + field,
                "children": [],
                "folder": true
            };
            
            optional = isOptional(segName, field);
            repeatable = isRepeatable(field);
            
            if(repeatable) {
                fieldObj.data = {
                    "icon": "repeatable.jpg"
                }
            } else {
                fieldObj.data = {
                    "icon": "no-icon.jpg"
                }
            }
            
            if(! optional) {
                fieldObj.extraClasses = "bg-danger bold";
            }
            
            getChildren(field, fieldObj.children);
            segObj.children.push(fieldObj);
        } else {        
            fieldObj = {
                "key": field,
                "title": segName + "." + ( idx + 1 ) + " " + field,
                "folder": false
            };
            
            optional = isOptional(segName, field);
            repeatable = isRepeatable(field);
            
            if(repeatable) {
                fieldObj.data = {
                    "icon": "repeatable.jpg"
                }
            } else {
                fieldObj.data = {
                    "icon": "no-icon.jpg"
                }
            }
            
            if(! optional) {
                fieldObj.extraClasses = "bg-danger bold";
            }
            
            segObj.children.push(fieldObj);
        }
        
    });
    
    treeData.push(segObj);
});

function getChildren(field, arrOfChildren) {
    if(messageTemplates[field]) {
        messageTemplates[field].forEach(function(child) {
            if(messageTemplates[child]) {
                var childObj = {
                    "key": child,
                    "title": child,
                    "children": [],
                    "folder": true,
                    "data": {
                        "icon": "no-icon.jpg"
                    }
                };
                
                getChildren(child, childObj.children);
                arrOfChildren.push(childObj);
            } else {
                arrOfChildren.push({
                    "key": child,
                    "title": child,
                    "folder": false,
                    "data": {
                        "icon": "no-icon.jpg"
                    }
                });
            }
        });
    }
}

function isOptional(segment, field) {
    return (optionalElements[segment].filter(function(_field) {
        return _field.name === field;
    })[0] || {}).optional;
}

function isRepeatable(elementName) {
    return repeatingElements.indexOf(elementName) >= 0;
}

