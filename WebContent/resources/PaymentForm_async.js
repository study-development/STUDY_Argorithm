//Custom Select css 적용 시 IE 깨짐 방지
var jQry = jQuery.noConflict();

//작성자 : 최용석
//작성일 : 2018-10-17
//설명 : 결제화면 인입(새로고침)시 실행 함수 부 호출
jQry(document).ready(function(){
	paymentCheck();						// 결제 여부 체크 함수 부 호출
	jQry('.customSelect').customSelect();	// 결제 select box 퍼블 그리기 함수 호출
	var airlineCodeRT = jQry("#airlineCodeRT").val();
	var tripTypeCheck = jQry("#tripTypeCheck").val();
	if(tripTypeCheck == "RT"){
		if(airlineCodeRT.indexOf("KE") > -1 && airlineCodeRT.indexOf("LJ") == -1){ //KE+LJ가 아닌 KE포함 왕복건
			jQry("#paySection_DEP").attr("style","display:none;") 
			jQry("#paySection_ARR").attr("style","display:none;")
		}
	}
});

//작성자 : 최용석
//작성일 : 2018-10-17
//설명 : 결제화면 인입(새로고침)시 결제 상태 체크 부
function paymentCheck(){
	jQry("#successDesc").text("");
	var totStep = parseInt(jQry("#totStep").val()); 		// 편도 : 1, 왕복 : 2 
	var payType = jQry("#payType").val(); 					// KEYIN_RT, CERTIFY_RT, KEYIN_OW, CERTIFY_OW, MIXED_RT
	
	var payStateDEP = jQry("#payStateDEP").val();			// 가는편의 결제 Y/N
	var pr_id0 = jQry("#pr_idDEP").val();					// 가는편의 pr_id

	var paymentFinishUrl = 'http://domair.interpark.com/dom/reservationFinish.do?' // 결제 완료 화면 URL
	
	if(totStep == 1){
		
		if(payStateDEP == 'Y'){
			jQry("#agreeSection").hide();						// 결제 규정 안내 화면 삭제
			paymentComplete("DEP")								// 가는편 결제 완료 처리
			
			paymentFinishUrl += 'pr_id0='+pr_id0+"&tripType=dep";
			setTimeout(function(){
				location.href = paymentFinishUrl;
			}, 5000);											//결제 완료 화면 이동
		}
	}else if(totStep == 2){
		var payStateARR = jQry("#payStateARR").val();			// 오는편의 결제 Y/N
		var pr_id1 = jQry("#pr_idARR").val();					// 오는편의 pr_id
		
		if(payStateDEP == 'Y' && payStateARR != 'Y'){			// 왕복편중 가는편만 결제 완료 된 경우
			paymentComplete("DEP")								// 가는편 결제 완료 처리
		}else if(payStateDEP != 'Y' && payStateARR == 'Y'){		// 왕복편중 오는편만 결제 완료 된 경우
			paymentComplete("ARR")								// 오는편 결제 완료 처리
		}else if(payStateDEP == 'Y' && payStateARR == 'Y'){		// 왕복편 결제 완료 처리
			
			jQry("#agreeSection").hide();						// 결제 규정 안내 화면 삭제
			
			if(payType != "SINGLE_KEYIN" && payType !="SINGLE_KEYIN_KE"){							// 왕복결제 완료 처리
				paymentComplete("DEP")
				paymentComplete("ARR")
			}else{												// 일괄결제 완료 처리
				jQry("#reseravtionFinishSection").show();
				jQry("#paySection_").hide();
			}
			
			paymentFinishUrl += 'pr_id0='+pr_id0+"&tripType=dep&pr_id1="+pr_id1+"&tripType=arr";
			setTimeout(function(){
				location.href = paymentFinishUrl;
			}, 5000);
		}	
	}
}

//작성자 : 최용석
//작성일 : 2018-10-17
//설명 : 결제화면 인입(새로고침)시 결제 완료 처리 부
function paymentComplete(tripType){
	jQry("#singleReservationFinish_" + tripType).show();		// 해당편 결제 완료 안내 화면 출력
	jQry("#paySection_" + tripType).hide();						// 해당편 결제 정보 입력 화면 삭제
	jQry("#check").attr("checked","checked");					// 결제 동의 사항 체크 처리
}

//작성자 : 최용석
//작성일 : 2018-10-17
//설명 : 결제화면 상세요금보기 on/off 처리 부
function detailPriceView(tripType, object){
	var eventBtn = jQry(object);														// 이벤트 객체(상세요금보기 버튼)
  var btnStatus = eventBtn.children('span');											// 이벤트 on/off 표기 객체 (span 태그)
  var fareView = eventBtn.parent('td').parent('tr').next('.detailPriceZone');			// 이벤트 on/off 출력 영역
  if(tripType == ""){
  	var fareView = eventBtn.parent('td').parent('tr').nextAll('.detailPriceZone');	// 이벤트 on/off 출력 영역
  }
  console.log(fareView.attr("id"))
	var aria_expanded = eventBtn.attr("aria-expanded"); // true(on) , false(off)		// on/off flag
	
	if (aria_expanded == "true") {	//상세요금 보기 off 처리
		fareView.attr("class","detailPriceZone")
		eventBtn.attr("aria-expanded","false");
		btnStatus.attr("class","");
	}else{	// 상세 요금 보기 on 처리
		fareView.attr("class","detailPriceZone active")
		eventBtn.attr("aria-expanded","true");
		btnStatus.attr("class","active");
	}
};

//작성자 : 최용석
//작성일 : 2018-10-17
//설명 : 개인카드, 법인카드 on/off 처리 부
//function cardForm(ava_cc, formName, payTripType){
function cardForm(ava_cc, tripType) {
	cardForm(ava_cc, tripType, "") //나이거 뭐때문에 추가했지?..
}

function cardForm(ava_cc, tripType, event) {
	var eventRadio = jQry(event);
//	eventRadio.parents('div').siblings('div').css({"color": "red", "border": "2px solid red"});
	
	if (ava_cc == "P") {
		var targetObject = eventRadio.parents('div').next('div');
		targetObject.css({"color": "red", "border": "2px solid red"});
		alert(targetObject.attr("id"))
		jQry("#personalCard_" + tripType).show(); // 개인카드 영역 on
		jQry("#personalCardBtn_" + tripType).show(); // 개인카드 영역 on
		jQry("#corporationCard_" + tripType).hide(); // 법인카드 영역 off
		jQry("#corporationCardBtn_" + tripType).hide(); // 법인카드 영역 off
		jQry("#AVA_CC_KEY").val("P"); // 결제카드 P : 개인
		jQry("#cardType").val("_p_"); // 결제카드 _p_ : 개인 결제 정보 입력 태그 ID 구분자
	} else {
		var targetObject = eventRadio.parents('div').prev('div');
		targetObject.css({"color": "red", "border": "2px solid red"});
		alert(targetObject.attr("id"))
		jQry("#corporationCard_" + tripType).show(); // 법인카드 영역 on
		jQry("#corporationCardBtn_" + tripType).show(); // 법인카드 영역 on
		jQry("#personalCard_" + tripType).hide(); // 개인카드 영역 off
		jQry("#personalCardBtn_" + tripType).hide(); // 개인카드 영역 off
		jQry("#AVA_CC_KEY").val("C"); // 결제카드 C : 법인
		jQry("#cardType").val("_c_"); // 카드타입 _p_ : 법인 결제 정보 입력 태그 ID 구분자
	}
	
}

//작성자 : 최용석
//작성일 : 2018-11-06
//설명 : KE 제3자 클릭시 일반 KEYIN 뷰 변경 처리 
function changeForm(payTripType, event){
	var airlineCodeRT = jQry("#airlineCodeRT").val();
	var tripTypeCheck = jQry("#tripTypeCheck").val();
	
	if(airlineCodeRT.indexOf("KE") > -1 && tripTypeCheck == "RT"){
		jQry("#paySection_DEP").attr("style","display:show;") 
		jQry("#paySection_ARR").attr("style","display:show;")
		jQry("#paySection_").attr("style","display:none;")
		jQry("#valid_hldr_p_DEP").val(jQry(event).val());
		jQry("#valid_hldr_p_ARR").val(jQry(event).val());
		jQry("#cc_hldr_nameDEP").val(jQry(event).val());
		jQry("#cc_hldr_nameARR").val(jQry(event).val());
		
	}else{
		jQry("#cc_hldr_name"+payTripType).val(jQry(event).val());
	}
	
	if(jQry(event).val() == "thirdParty"){
		toggleLayer("thirdPartyGuideLayer", event);						// 제3자 선택 시 인증 결제 안내 문구 팝업 출력
		
		jQry("[id*=KE_hide"+payTripType).attr("style","display:none;")	// 카드 소유주 이름, 주민등록번호 7번째 자리 영억 hide
		jQry("#KE_colspan"+payTripType).attr("colspan","3")				// 카드 소유주 입력 row colspan 부여
		jQry(event).parent('div').parent('td').hide();					// select box는 퍼블 그리기 함수 실행 후 div로 감싸짐, 카드 소유주 출력 td hide처리
		jQry("[id*=valid_gender_p_"+payTripType).val("1"); 				// 제 3자일 경우 어차피 서신평 안타므로 값 1셋팅하여 validation 제외
	}else if(event == null){
		alert("법인카드 제 3자")
	}else{
		jQry("#cc_hldr_name"+payTripType).val(jQry(event).val());
	}
}

//수정자 : 최용석
//수정일 : 2018-10-17
//수정항목 : 결제간소화로 인한 결제 요청 부 수정
//설명 : keyin결제 validation 수정, keyin결제 파라미터 셋팅 부 호출, 일괄결제 및 편도결제 요청 호출
function validation(formName, cardType , payTripType, obj) {
	//formName			: p_formDEP / p_formARR / p_form(일괄결제뷰)	
	//cardType			: _p_ (개인카드) / _c_ (법인카드)
	//payTripType		: DEP / ARR / ""
	//obj				: event Object
	
	var valiadID = cardType+payTripType;
	// valiadID			: _p_DEP / _p_ARR / _c_DEP / _c_ARR / 일괄결제 _p_ / _c_
	
	var valiadFormID = payTripType;
	// valiadFormID		: DEP / ARR / 일괄결제 : ""
	
	console.log("validation \n ** formName : " + formName +" \n ** payTripType : " + payTripType + " \n **  valiadID : " + valiadID + " \n **  valiadFormID : " + valiadFormID);
	
	var payType = jQry("#payType").val();	// 결제 타입
	// payType (편도)		: KEYIN_OW / KEYIN_KE_OW / CERTIFY_OW
	// payType (왕복)		: MULTI_KEYIN / MIXED_RT / SINGLE_KEYIN_KE / SINGLE_KEYIN

	var checked = jQry("#check").is(":checked");	// 결제 동의 사항 체크
	if(!checked) {
		jQry("#check").focus();
		alert("결제전 확인사항에 동의해주세요.");
		return false;
	}
	
	var isValid = true;
	
	console.log("validation \n ** SectionID : #paySection_" + valiadFormID +" \n **  valiadID : " + valiadID);
	jQry.each(jQry("#paySection_" + valiadFormID + " input[id$="+valiadID+"], "+ "#paySection_" + valiadFormID + " select[id$="+valiadID+"]"), function(i) {
		if(jQry.trim(jQry(this).val()) == "" || (jQry.trim(jQry(this).val()).indexOf("예)") >-1 )) {
			isValid = false;
			var validationMsg= jQry(this).attr("title");
			alert(validationMsg);
			this.focus();
			jQry(this).css({"color": "red", "border": "2px solid red"});
			return false;
		}
		jQry(this).css({"color": "black", "border": "2px solid blue"});

		//		//이거뭐지...하..
//		if(cardType =="_p_" && jQry(this).attr("id") == "valid_birth") {
//			if(!isValidDate(jQry(this).val())) {
//				alert("생년월일은 YYMMDD(800101)로 입력해 주세요");
//				this.focus();
//				isValid = false;
//				return false;
//			}
//		}
	});

	if(isValid) {
		//일괄결제 valid객체 바라보기
		//일괄결제(단일뷰)인 경우 각 validation에 해당하는 tag들의 ID에 가는편/오는편 정보가 없으므로
		//일괄결제 이거나
		//KE포함된 왕복 예약건이면서, KE가 본인카드이고, 해당 KE가 결제 N일때 일괄결제 처리
//		if(payType =="SINGLE_KEYIN" || (payType == "SINGLE_KEYIN_KE" && getKEPaymentCondition(formName, payTripType)) && kePaymentYN ="N" ) ){ //초기뷰가 일괄결제이고, KE포함일시 마지막 결제직전 상태가 개인카드일경우		valiadID = cardType;
		
		var cc_account = "";
		jQry.each(jQry("#paySection_" + valiadFormID + " input[id*=cardNo]"), function(i){
			jQry(this).css({"color": "red", "border": "2px solid red"});
				cc_account += jQry.trim(jQry(this).val());
		});

		if(cc_account.length < 14) {	//다이너스 카드 관련 밸리데이션 수정 (카드번호 14자리)
			alert("올바른 카드번호를 입력해주세요.");
			return false;
		}
		jQry("#cc_account" + payTripType).val(cc_account);
		
		if(getOnePayCondition(formName, payTripType)){
			if(jQry("#payStateDEP").val() == "Y"){	// 가는편 결제 완료시 오는편 결제
				payTripType = "ARR";			
			}else{									// 가는편 미결제 시 가는편 결제
				payTripType = "DEP";
				jQry("#successDesc").text("가는편 결제가 진행중입니다.")
			}
		}
		
		/** 다중클릭 방지 **/
		if(doubleSubmitCheck()) return;
		
		toggleLayer("loadingBar", obj);						// 로딩 레이어

		setTimeout(function(){
			gtmCheckoutOption("paycheckoutOption", 3, "신용카드"); // GTM gtmCheckoutOption(Pay CheckOutOption step : 3) push **/
			setPaymentDate(formName, payTripType, cardType, payType, cc_account);		// KEYIN 결제 정보 셋팅
			newpayment(formName, obj, payTripType);	
		},100);		// 결제 요청
		
	}
}

//KE포함된 왕복 예약건이면서, KE가 본인카드이고, 해당 KE가 결제 N일때 일괄결제 true
function getOnePayCondition(formName, payTripType){
	var onePayYn = false
	
	var payType = jQry("#payType").val();	// 결제 타입
	
	if(payType == "SINGLE_KEYIN"){	
	//KE,LJ를 제외한 왕복결제
		onePayYn = true;
	}else if(payType == "SINGLE_KEYIN_KE" && getKEPaymentCondition(formName, payTripType)){
		onePayYn = true;
	//KE를 포함한 왕복결제이면서, KE가 결제상태가 아니고 개인카드일 경우	
	}
	
	return onePayYn;
	
}

//작성자 : 최용석
//작성일 : 2018-11-08
//설명 : 결제 FormName 리턴 부
//		KE의 결제 요청 시 결제 타입을 체크
//payType이 SINGLE_KEYIN_KE 인 경우에만 여기를 태워보자	
//KE포함된 예약건의 KE KEYIN YN을 리턴
function getKEPaymentCondition(formName, payTripType){
	var avacc = jQry("#AVA_CC_KEY").val();
	
	var thirdParty = ""; //제 3자여부
	var kePaymentYN = jQry("#kePaymentYN").val(); //KE의 결제여부
	
	if(formName == "p_form"){ //일괄결제 폼일경우
		thirdParty = jQry("#valid_hldr_p_").val() // 제3자 여부
	}else{
		thirdParty = jQry("#"+formName+" [id*=cc_hldr_name]").val() // 제3자 여부
	}
//	var currentAirlineCode = jQry("#airlineCode"+payTripType).val();
	var ownYN = false; // 본인카드 YN
	console.log(" ** getKEPaymentCondition before \n ** formName : " + formName + " \n ** avacc : " + avacc + " \n ** thirdParty : " + thirdParty +" \n ** ownYN : " + ownYN + " \n ** kePaymentYN : " + kePaymentYN);
	
	//KE 이면서 법인카드가 아니고, 제3자 카드가 아닌경우는 본인카드 y
//	if((avacc =="C" || thirdParty == "thirdParty")){
//		ownYN = false;
//	}else{
//		ownYN = true;
//	}
	
	if((avacc !="C"  && thirdParty != "thirdParty") && kePaymentYN == "N"){
		ownYN = true;
	}
	
	console.log(" ** getKEPaymentCondition after \n ** formName : " + formName + " \n ** avacc : " + avacc + " \n ** thirdParty : " + thirdParty +" \n ** ownYN : " + ownYN);
	return ownYN;
}

function setPaymentDate(formName, tripType, cardType, payType, cc_account){
	// formName			: p_formDEP / p_formARR / p_form(일괄결제뷰)	
	// tripType			: DEP / ARR
	// cardType			: _p_ (개인카드) / _c_ (법인카드)
	// payType (편도)		: KEYIN_OW / KEYIN_KE_OW / CERTIFY_OW
	// payType (왕복)		: MULTI_KEYIN / MIXED_RT / SINGLE_KEYIN_KE / SINGLE_KEYIN
	
	var setTag = cardType+tripType;
	// setTag			: _p_DEP / _p_ARR / _c_DEP / _c_ARR
	console.log("setPaymentDate before \n ** formName :" + formName + " \n ** tripType : " + tripType +" \n ** cardType : " + cardType + " \n **  payType : " + payType + " \n **  cc_account : " + cc_account + " \n **  setTag : " + setTag);
	
	//일괄결제 : KE,LJ가 포함되지 않음 왕복예약 이거나, LJ가 제외된 KE포함 예약건 중 개인카드일경우(가는편 오는편 상관없이 서신편은 무조건 먼저타야함)
//	if(payType == "SINGLE_KEYIN" || (getKEPaymentCondition(formName, tripType) && kePaymentYN == "N")){
	if(getOnePayCondition(formName, tripType)){
		setTag = cardType;
		// setTag		: _p_ / _c_
		//keyin 왕복 결제 시 가는편 결제에 사용된 cc_acount(카드번호)를 오는편 form의 cc_account에 셋팅
		if(tripType == "ARR"){
			if(jQry("#cc_accountDEP").val() ==""){ // 가는편결제성공,오는편결제실패 후 새로고침할경우 해당값 초기화됨, 입력값으로 재셋팅
				jQry("#cc_account" + tripType).val(cc_account);
			}else{
				jQry("#cc_account" + tripType).val(jQry("#cc_accountDEP").val());
			}
		}
	}
	
	//현재 결제편의 hidden form태그에 입력받은 결제 정보를 셋팅
	jQry("#installment"+tripType).val(jQry("#installment"+setTag).val());			// 할부개월수
	jQry("#exp_date_y"+tripType).val(jQry("#valid_year"+setTag).val());				// 유효기간 YY
	jQry("#exp_date_m"+tripType).val(jQry("#valid_month"+setTag).val());			// 유효기간 MM
	jQry("#card_pwd"+tripType).val(jQry("#valid_password"+setTag).val());			// 카드 비밀번호 
	jQry("#account_code"+tripType).val(jQry("#valid_cardCode"+setTag).val());		// 결제 카드사
	jQry("#gender"+tripType).val(jQry("#valid_gender"+setTag).val());				// 성별
	jQry("#customer_code"+tripType).val(jQry("#valid_customer_code"+setTag).val());	// 생년월일 YYMMDD
	jQry("#c_name"+tripType).val(jQry("#valid_companyName"+setTag).val());			// 법인명->이건삭제하란다
	
	//카드 소유주 삭제
//	jQry("#cc_hldr_last_name"+tripType).val(jQry("#valid_familyName"+setTag).val());
//	jQry("#cc_hldr_gvn_name"+tripType).val(jQry("#valid_givenName"+setTag).val());
	

	//jQry("#customer_code"+tripType).val(jQry("#valid_companyNo"+cardType+tripType).val()); //사업자
//	var cc_hldr_name = jQry("#valid_hldr"+setTag).val();
//	if(cc_hldr_name != "thirdParty"){
//		jQry("#cc_hldr_name"+tripType).val(jQry("#valid_hldr"+setTag).val());
//	}
	

}


//작성자 : 최용석
//작성일 : 2018-11-08
//설명 : 결제 FormName 리턴 부
function getPaymentFormName(formName, payTripType){
//	var payType = jQry("#payType").val();		// KEYIN_OW, CERTIFY_OW, KEYIN_RT, CERTIFY_RT, MIXED_RT
//	var avacc = jQry("#AVA_CC_KEY").val();
//	var airlineCodeRT =jQry("#airlineCodeRT").val();
//	var thirdParty = jQry("#"+formName+" [id*=cc_hldr_name]").val() // 제3자 여부
//	console.log("#"+formName+" [id*=cc_hldr_name]")
	console.log(" ** getPaymentFormName after \n ** formName : " + formName +" \n ** payTripType  : " + payTripType);
	
	//
	if(payType == "SINGLE_KEYIN" || getKEPaymentCondition(formName, payTripType)){		// 초기 단일뷰 일 경우 passenger_record 데이터를 foreach로 셋팅하지 못하므로 tripType이 붙어오지 않음
			//SINGLE_KEYIN -> LJ,KE가 아닌 왕복예약건 : 일괄결제 fromName셋팅
			//SINGLE_KEYIN_KE -> KE가 포함된 초기 단일뷰일 경우
		 		// - KE 초기뷰이면서 개인카드일 경우
				// - KE 초기뷰이면서 제3자카드가 아닌경우
			//
			//여기 수정할것
			//KE,LJ가 없는 일괄결제(SINGLE_KEYIN)이거나, //초기뷰가 SINGLE_KEYIN_KE이면서 KE의 마지막 결제 컨디션이 개인결제(airlinCode.indexOf("KE" > -1) && avacc =="p")
//			if(!airlineCodeCase => LJ+KE){
			//일괄결제일때만
			//airlineCode가 LJ,KE가 아닐경우
			//KE일경우에는 법인카드가 아니거나(avacc !="C"), 제 3자 카드가 아닌경우(thirdParty != "thirdParty")
			formName = formName + payTripType					
	}
//		else{
//			// KE를 포함한 결제의 경우 KE 결제 뷰의 마지막 컨디션을 체크
//			//KE keyin결제가 아닌 경우(법인,제3자)는 etform을 타야되므로
//			//formName = formName + payTripType 해당 코드는제외한다
//			//ke keyin의 마지막 컨디션은 viewType으로 정의한다.
//			// 법인카드는 ava-cc로 제외
//			// 제 3자 카드는 thirdParty로 제외
//			//viewType =
////			if(ke개인결제){
////				formName = formName + payTripType
////			}
//		}
	console.log(" ** getPaymentFormName after \n ** formName : " + formName +" \n ** payTripType  : " + payTripType);
	return formName;
}

//작성자 : 최규현
//작성일 : 2018-10-29
//설명 : 인증 노티 팝업 버튼
function authNoticeLayer(airlineCode, payTripType){
	toggleLayer("authNotice", null);
	chkForm(airlineCode,payTripType);
}

//작성자 : 최규현
//작성일 : 2018-10-29
//설명 : 결제 요청 인증/키인 구분
function newpayment(formName, obj, payTripType){
	console.log("newpayment : " + formName +" / " + payTripType);
	var paymentType = "KEYIN";
	
	var airlineCode = jQry("#airlinecode"+payTripType).val();
	if((airlineCode =="KE" || airlineCode =="LJ")){ 
		paymentType = beforPaymentAuth(formName, obj, payTripType);	//서신평, 천원인증
	}
	
	if(paymentType == "AUTH"){
		toggleLayer("loadingBar", null); // 로딩 종료
		doubleSubmitFlag = false;

		if(airlineCode =="KE"){	//대한항공인 경우 인증 노티 
			toggleLayer("authNotice", null);
			jQry("#authNoticeBtn").attr("onclick","authNoticeLayer('"+ airlineCode +"','"+ payTripType +"')");
		}else{
			//타스프 : N 이면 LJ, KE(제3자,법인)은 모조리 여기로 태워야된다.
			chkForm(airlineCode,payTripType);
		}
	}else if(paymentType =="KEYIN"){		//기본 키인
		domairPayment(formName, obj, payTripType); //키인결제 진행
	}
}

//작성자 : 최규현
//작성일 : 2018-10-29
//설명 : 서신평 및 천원인증
function beforPaymentAuth(formName, obj, payTripType){
	console.log("beforPaymentAuth \n ** formName : " + formName + " \n ** " + payTripType);
	
	var result = ""; 
	var avacc = jQry("#AVA_CC_KEY").val();
	var nameCertYN = "N";
	
//	var payType = jQry("#payType").val();		// KEYIN_OW, CERTIFY_OW, KEYIN_RT, CERTIFY_RT, MIXED_RT
//	
//	if(payType == "KEYIN_RT" || payType == "KEYIN_KE_RT"){					// KEYIN_RT일 경우 formName에 tripType이 붙어오지 않는다
//		formName = formName + payTripType		// KEYIN 결제의 경우
//	}
	formName = getPaymentFormName(formName, payTripType);
	
	//대한항공 포함일경우만 태운다
	if(getKEPaymentCondition(formName, payTripType)){	//대한항공이고 / 법인카드인 아니고 제3자 아닌 경우만 서신평 진행
		nameCertYN = "Y";
	}
	
	// 결제 formData
	var authData = jQry("#"+formName).serialize()+"&AVA_CC="+avacc+"&nameCertYN="+nameCertYN;
	authData = authData.replace("CUSTOMER_CODE","customer_code").replace("PNRADDR","PNR");
	console.log("beforPaymentAuth \n ** formData : " + authData)
	
	new jQry.ajax({
		url : "/api/mypage/savePaymentInfo.do",
		type : "POST",
		data : authData,
		dataType : "json",
		async : false,
		success : function(json) {
			console.log(json)
			var errorNo = json.errorNo;
//			errorNo = "0";//로컬에서는 KE일때 고정시키고 진행, LJ일때는 풀어야된다 무조건 인증모듈이 뜨므로
			if(errorNo == "0"){		//천원인증 성공
				if(nameCertYN == "Y" && avacc == "P"){	//키인 결제 하는 경우
					result = "KEYIN";
				}else{
					result = "AUTH";
				}
			}else{	//1000원 인증 실패
					//천원인증 실패 얼럿
				toggleLayer("loadingBar", null); // 로딩 종료
				
				jQry("#authErrorText").text(json.errorDesc);
				toggleLayer("authErrorNotice", obj);
				
				doubleSubmitFlag = false;
				result = "FAIL";			
			}
		},error : function(request, status, error) {	// ajax error
			alert("인증 실패");
		}
	});
	return result;
}

//수정자 	: 최용석
//수정일 	: 2018-10-17
//수정항목	: 결제간소화로 인한 결제 ajax 수정
//설명 	: 각 결제화면의 예약건 결제-> 한 결제화면의 가는편, 오는편 결제
//파라미터
	// formName 	: 결제예약건의 form태그 ID
	// obj 			: 팝업 출력을 위한 object
	// payTripType 	: 가는편 DEP, 오는편 ARR
//비고	: KEYIN_RT(통판왕복)의 경우 formName에 payTripType이 붙어서 오지 않음
//비교	: 
	// KEYIN_RT가 아닌경우 : etFormDEP/etFormARR, p_FormDEP, p_FormARR
	// KEYIN_RT인 경우	: p_Form
var errorCnt = 0;

function domairPayment(formName, obj, payTripType) {

	console.log("domairPayment \n ** formName : " + formName +" \n ** " + payTripType);
	var payType = jQry("#payType").val();		// KEYIN_OW, CERTIFY_OW, KEYIN_RT, CERTIFY_RT, MIXED_RT
	
	var ownYN = false;
	console.log("domairPayment \n ** formName : " + formName +" \n ** " + payTripType +" \n ** " + payType);
	
	var paymentAirlineCode = jQry("#airlineCode"+payTripType).val();
	if(formName.indexOf("etForm") > -1){		// 인증 결제인 경우
		var reqData = jQry("#" + formName).serialize();
		if(payType == "SINGLE_KEYIN_KE" && paymentAirlineCode == "KE"){ //SINGLE_KEYIN_KE 이면서 현재 결제편이 KE일경우만
			ownYN = getKEPaymentCondition(formName, payTripType);
		}
	}else{
		formName = getPaymentFormName(formName, payTripType);
		var reqData = jQry("#" + formName).serialize()+"&AVA_CC="+jQry("#AVA_CC_KEY").val();
	}
	
	
	console.log("domairPayment \n ** formData : " + reqData)
	
	//여기서 일괄결제 인지 단일결제인지.. 판단하는 flag를 하나세워서
	//단일결제인 경우는 결제완료 팝업 및 결제완료처리 함수를 호출하고 reload
	//일괄결제의 가는편 결제인 경우는 결제완료 미팝업 처리 및 부분결제 완료 처리 함수를 호출하고 일괄 결제 진행
	//일괄결제의 오는편 결제인 경우는 결제완료 미팝업 처리 및 부분결제 완료 처리 함수를 호출하고 reload
	new jQry.ajax({
		url : "https://domair.interpark.com/dom/payment.do",
		type : "POST",
		data : reqData,
		dataType : "json",
		success : function(json) {
			toggleLayer("loadingBar", null);  //로딩 레이어 닫기
			console.log("domairPayment success : " + json)
			//payment return 데이터 셋팅
			var CommonPaymentData = json.CommonPaymentDataVO;
			var paymentResult = json.PaymentResult;
			
			if(paymentResult != null){
				var errorCode = paymentResult.errorNo;
				var errorDesc = paymentResult.errorDesc;
				var url = paymentResult.nextPage;
				var tripType = paymentResult.tripType;

				//결제 성공 시
				if (errorCode == "success") {
					setGtmTransaction(payTripType); 							// 결제 성공 예약건 GTM발송
					
					jQry("#payState"+payTripType).val("Y");						// 결제 상태 변경
					jQry("#singleReservationFinish_"+payTripType).show();		// 결제 완료 영역
					jQry("#paySection_"+payTripType).hide();					// 결제 정보 입력 영역
					var airlineCodeRT = jQry("#airlineCodeRT").val();
					
					if(payType =="SINGLE_KEYIN" && (payType == "SINGLE_KEYIN_KE" && ownYN)){ //초기뷰가 일괄결제이고, KE포함일시 마지막 결제직전 상태가 개인카드일경우
						if(payTripType == "DEP"){									// 일괄결제 가는편 성공일 경우
							if(paymentAirlineCode == "KE"){
//								SINGLE_KEYIN_KE 이면서 해당편이 KE일 경우 kePaymentYN = Y로 변경
//								KE+ETC일경우 KE일때만 검사하는 함수는 미호출
//								KE+KE일때는?
								jQry("#kePaymentYN").val("Y");
							}
							getNextPayment(obj, "Y", payType);						// 일괄결제 오는편 결제 요청
						}else{
							location.reload();									// 일괄결제 오는편 결제 완료 시 reload()
						}
					}else{
						toggleLayer("paymentSuccessLayer_" + payTripType, obj);	// 결제 완료 팝업 
						location.reload();		// 편도 결제 완료 시 reload();
					}
					
					if(!getKEPaymentCondition(formName,payTripType)){
						
					}
//					if((payType != "SINGLE_KEYIN" && payType != "SINGLE_KEYIN_KE") && airlineCodeRT.indexOf("LJ") == -1){									// 일괄결제시 완료 팝업은 띄우지 않음
//						console.log(payType + " / " + airlineCodeRT.indexOf("LJ"))
//					}
					
//					if((payType != "SINGLE_KEYIN" || payType != "SINGLE_KEYIN_KE") && airlineCodeRT.indexOf("LJ") == -1){								// 일괄결제 성공 처리
//						if(payType != "KEYIN_KE_RT"){
//							//KE 마지막 컨디션을 체크한다. 일괄결제를 태울건지, 편도만 타야되는건지
//						}
////						jQry("#payTryCnt").val("0");							// 결제 시도 횟수 초기화
////						jQry("#payAmount_"+payTripType).html("<font color='red'>결제완료</font>");
//						if(payTripType == "DEP"){								// 일괄결제 가는편 성공일 경우
//							getNextPayment(obj, "Y", payType);							// 일괄결제 오는편 결제 요청
//						}else{
//							location.reload();									// 일괄결제 오는편 결제 완료 시 reload()
//						}
//					}else{
//						location.reload();		// 편도 결제 완료 시 reload();										
//					}
					// 새로고침 방지 스크립트 추가 후, 뒤로가기 버튼 클릭 시 paymentForm.do 요청이 들어가지 않아
					// 결제 완료 후에 브라우저 뒤로가기 버튼 클릭 시, 결제 입력 화면이 출력 되므로 
					// 결제 완료 될때마다 reload호출 하여 페이지 인입시 ready function에서 paymentCheck() 호출
					
				} else { // 결제 항공사 Payment error : errorCode = fail
					jQry("#payTryCnt").val(++errorCnt);											//결제 실패 횟수 증가 : payTryCnt > 3일 경우 메인화면 팝업 출력
					doubleSubmitFlag = false;													//중복 결제 방지 flag 해제
					
					//일괄결제 : 오는편 결제 완료, 가는편 결제 실패 시 오는편 유도 팝업은 hide 처리한다.
					if((payType =="SINGLE_KEYIN" || payType =="SINGLE_KEYIN_KE") && jQry("#payStateDEP").val() != "Y" && jQry("#payStateARR").val() == "Y"){
						jQry("#nextPayGuide").hide();
						jQry("#nextPayBtn").hide();
					}
					
					jQry("#" + errorCode+"Layer_"+payTripType+" #errorDesc").text(errorDesc);	//오류 내용 셋팅
					jQry(obj).css("display", "");												//모든 팝업 none 처리
					toggleLayer(errorCode + "Layer_" + payTripType, obj);  // 에러팝업 열기			//에러 팝업 show 처리
					
				}
			} else { // domair controller error : errorCode = error
				jQry("#payTryCnt").val(++errorCnt);												//
				doubleSubmitFlag = false;
				jQry(obj).css("display", "");
				toggleLayer("errorLayer_"+payTripType, obj);  // 에러팝업레이어 열기
			}
		},
		error : function(request, status, error) {	// ajax error : ajax 통신이 실패한 모든 경우(로그인 세션 만료 등)
			doubleSubmitFlag = false;
			alert("결제 실패");
			jQry(obj).css("display", "");
			toggleLayer("loadingBar", null);
		}
	});
}
/** 결제 ajax 실행 **/

function getNextPayment(obj, depPayYn, payType){
	if(depPayYn != "Y"){
		jQry("#failLayer_DEP").hide();
		jQry("#successDesc").text("오는편 결제가 진행중입니다.");
		toggle_mask_parent()
	}else{
		jQry("#successDesc").text("가는편 결제가 완료되었습니다. 오는편 결제가 진행중입니다.")
	}
	toggleLayer("loadingBar", obj);  //로딩 레이어 닫기
	var cardType = jQry("#cardType").val();				// 일괄결제 오는편 카드타입(_p_, _c_) 셋팅
	setPaymentDate("p_form","ARR", cardType, payType, "");		// 일괄결제 오는편 결제 정보 셋팅
	domairPayment("p_form", obj, "ARR");				// 가는편 결제 완료시 오는편 결제
	
}


var valid_map = new Map();

/***********************************
* domair 일 때 true 아니면 false	*
***********************************/	
function domairCheck() {
	var viewUrl = jQry(location).attr("pathname").split("/")[1]; //현재 보고있는 페이지

	if(viewUrl.indexOf("dom") > -1 ) {
		return true;

	} else {
		return false;
	}
}

function toggleLayer(container, obj) {
	var display = jQry("#" + container).css("display");

	if(display == "none") {
		var width = (document.body.clientWidth / 2) - (jQry("#"+container).width() / 2) + document.body.scrollLeft;

		if(container == "paymentGuideLayer"){
			var height = ((jQry(window).height() - jQry(this).outerHeight()) / 2) + jQry(window).scrollTop();
			jQry("#" + container).css("top", height);
			jQry("#" + container).css("position","absolute");
		}else{
			jQry("#" + container).css("top", "10%");
			jQry("#" + container).css("position","fixed");
		}
		jQry("#" + container).show();
		jQry("#" + container).css("left", width) ;
		jQry("#" + container).css("z-index", 1001);
	} else {
		jQry("#" + container).hide();
	}

	toggle_mask_parent();
}

function toggleBtn(containerId, buttonId){
	if(jQry("#"+containerId).css("display")=="none"){
		jQry("#"+containerId).show();
		jQry("#"+buttonId).text(" 닫기");
	}
	else{
		jQry("#"+containerId).hide();
		jQry("#"+buttonId).text(" 열기");
	}
}

function closeLayer(layerId) {
	jQry("#" + layerId).hide();
	toggle_mask_parent();
	if(layerId == "statusErrorLayer"){
		jQry("#p_btn").hide();
	} else if(layerId == "paymentGuideLayer"){
		jQry("#popupGuide").hide();
		jQry("#popupGuideBtn").text(" 열기");
		jQry("#ispGuide").hide();
		jQry("#ispGuideBtn").text(" 열기");
	}
}

function nextPayment(url) {
	location.href = "paymentForm.do?" + url;
	return false;
}

jQry(document).on("keyup", "input:text[only_num]",function(){ 
	var keyCode = event.keyCode; 
	if(keyCode == 8 || keyCode == 9 || keyCode == 37 || keyCode == 39 || keyCode == 46
			|| (keyCode > 32 && keyCode < 37) || (keyCode > 113 && keyCode < 122)
			|| (keyCode > 16 && keyCode < 21) || keyCode == 45 || keyCode == 144
			|| keyCode == 145 || keyCode == 27 || keyCode == 25 || keyCode == 93) {
		return;
	}

	if(keyCode < 48 || keyCode > 57 && !(keyCode > 95 && keyCode < 106)) {
		event.returnValue = false;
	}
	jQry(this).val(jQry(this).val().replace(/[^0-9]/gi,""));
});

jQry(document).on("keypress", "input:text[only_num]",function(){ 
	var keyCode = event.keyCode; 
	if(keyCode == 9) {
		jQry(this).val(jQry(this).val().replace(/[^0-9]/gi,""));
	}
});

jQry(document).on("mouseout", "input:text[only_num]",function(){ 
	jQry(this).val(jQry(this).val().replace(/[^0-9]/gi, ""));
});

jQry(document).on("keypress", "input:text[only_char]",function(event){ 
	event = event || window.event;
	var keyCode = (event.which) ? event.which : event.keyCode;
	if(keyCode == 8 || keyCode == 9 || keyCode == 37 || keyCode == 39 || keyCode == 46) {
		return;
	}
	
	if((keyCode>=32 && keyCode<48) || (keyCode>57 && keyCode <65) || (keyCode>90 &&  keyCode<96) ||
			  keyCode == 124 || keyCode == 96 ||keyCode==123 || keyCode==125
			  || (event.keyCode >= 48 && event.keyCode <= 57))  {
		
		 return false;
	}
});

function onlyChar(object) {
	var inText = object.value;
	var deny_pattern = /^[가-힣a-zA-Z\s]+$/;
		
	if( inText == "" )
		return false;
		
	if( !deny_pattern.test(inText)) {
		alert("영어와 한글만을 입력하세요");
		object.value = "";
		object.focus();
		return false;
	}
} 

//수정자 	: 최용석
//수정일 	: 2018-10-22
//수정항목	: 결제 간소화로 인한 GTM 발송 파라미터 셋팅 부 수정
//수정내용	: GTM 발송 파라미터 값 가는편 오는편 구분 
function setGtmTransaction(tripType) {
	var payIdx = 0;
	if(tripType != "DEP"){
		payIdx = 1;
	}
	
	console.log("payIdx : " + payIdx);
	/** GTM Pay Transaction push **/
	var prid = jQry("#pr_id" + payIdx).val();
	var gid = jQry("#gaId" + payIdx).val();
	var gname = jQry("#gaName" + payIdx).val();
	var gprice = jQry("#gaPrice" + payIdx).val();
	var gtax = 0;
	var garrcity = 	jQry("#gaArrCity" + payIdx).val();					// 도착 도시
	var gquantity = 1;				// 인원수
	
	var dimension6 = jQry("#gaDepDate" + payIdx).val();		//출발일자 (YYYYMMDD)       
	var dimension9 = jQry("#gaQuanDesc").val();	    //인원수 (성인1, 소아0, 유아0)             
	var dimension10 = 0; 							//박수 왕복 : {오는편} - {가는편} // 편도 : 0
	var dimension11 = "편도"	;						//항공 여정                 
	var dimension12 = jQry("#gaCreDate" + payIdx).val();		//예약일시 (YYYYMMDD 00:00) 
	var dimension13 = dimension6.substring(0, 6);	//출발월 (YYYYMM)          
	var dimension15 = dimension6 + "-" + dimension12.substring(0, 8);		//리드타임 > 출발일자-예약일자
	
	var product = {
			"prid" : prid,						// prid
			"id" : gid,							//  product id LJ_CJU_GMP_0302
			"name" : gname,						// product id & name 진에어_제주_김포_0302
			"price" : gprice,					// 가격
			"tax" : gtax,						//  공항세 + 유류세
			"brand" : "대한민국",
			"category" : dataLayer[0].Depth1+"/"+dataLayer[0].Depth2+"/"+dataLayer[0].Depth3+"/"+ garrcity +"/"+ garrcity,
			"variant" : "국내출발",					
			"quantity" : gquantity,				// 인원수
			"dimension6" : dimension6,			//출발일자 (YYYYMMDD)       
			"dimension7" : dimension6,			//귀국일자 (YYYYMMDD)       
			"dimension8" : (dimension10 + 1),	//일수 (박수)               
			"dimension9" : dimension9,			//인원수 (성인1, 소아0, 유아0)              
			"dimension10" : dimension10,		//박수 왕복 : {오는편} - {가는편} // 편도 : 0
			"dimension11" : dimension11,		//항공 여정                 
			"dimension12" : dimension12,		//예약일시 (YYYYMMDD 00:00) 
			"dimension13" : dimension13,		//출발월 (YYYYMM)          
			"dimension14" : "한국출발",			
			"dimension15" : dimension15,		//리드타임 > 출발일자-예약일자      
			"dimension16" : "OK"				//예약구분 > 예약상태구분 OK // 대기
	}

	gtmTransaction("paytransaction", product);
}

function toggle_mask_parent() {
	var toggle = jQry("#mask_container").css("display");
	
	if(toggle == "none") {
		/** 부모창 modal **/
		var win_height = document.documentElement.scrollHeight;
		jQry("#mask_container").css("height", win_height);
		jQry("#mask_container").css("display", "");
		
	} else {
		jQry("#mask_container").css("display", "none");
	}
}

function isDateFormat(d) {
    var df = /[0-9]{2}[0-9]{2}[0-9]{2}/;
    return d.match(df);
}

/*
 * 윤년여부 검사
 */
function isLeaf(year) {
    var leaf = false;

    if(year % 4 == 0) {
        leaf = true;

        if(year % 100 == 0) {
            leaf = false;
        }

        if(year % 400 == 0) {
            leaf = true;
        }
    }

    return leaf;
}

/*
 * 날짜가 유효한지 검사
 */
function isValidDate(d) {
    // 포맷에 안맞으면 false리턴
    if(!isDateFormat(d)) {
        return false;
    }

    var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var year = Number(d.substring(0, 2));
    var month = Number(d.substring(2, 4));
    var day = Number(d.substring(4));
    
    // 날짜가 0이면 false
    if(day == 0) {
        return false;
    }

    var isValid = false;
    // 윤년일때
    if(isLeaf(year)) {
        if(month == 2) {
            if(day <= month_day[month-1] + 1) {
                isValid = true;
            }
        } else {
            if(day <= month_day[month-1]) {
                isValid = true;
            }
        }
    } else {
        if(day <= month_day[month-1]) {
            isValid = true;
        }
    }

    return isValid;
}

function Map() {
	this._array = new Array();
	this.pointer = 0;
	
	this._getIndexByKey = function(key) {
		for(var i = 0; i < this._array.length; i++) {
			if(key == this._array[i][0]) {
				return i;
			}
		}
		return -1;
	}
	
	this.put = function(key, value) {
		var index = this._getIndexByKey(key);
		if(index == -1) {
			var newArray = new Array();
			newArray[0] = key;
			newArray[1] = value;
			this._array[this._array.length] = newArray;
		
		} else {
			this._array[index][1] = value;
		}
	}
	
	this.get = function(key) {
		for(var i = 0; i < this._array.length; i++) {
			if(this._array[i][0] == key) {
				return this._array[i][1];
			}
		}
	}
	
	this.size = function() {
		return this._array.length;
	}
	
	this.forEach = function(callback) {
		var len = this.size();
		for (i = 0; i < len; i++) {
			var item = this._array[i][0];
			var isReturn = false;
			isReturn = callback(item);
			if(isReturn) return;
		}
	}
}

//작성자 : 최규현
//작성일 : 2018-10-18
//작성내용 : 결제화면 새로고침(f5), 백스페이스 이벤트 방지
jQry(document).keydown(function(e) {
    key = (e) ? e.keyCode : event.keyCode;
     
    var t = document.activeElement;
     
    if (key == 8 || key == 116 || key == 17 || key == 82) {
        if (key == 8) {			//백스페이스
            if (t.tagName != "INPUT") {
                if (e) {
                    e.preventDefault();
                } else {
                    event.keyCode = 0;
                    event.returnValue = false;
                }
            }
        } else {
            if (e) {
                e.preventDefault();
            } else {
                event.keyCode = 0;
                event.returnValue = false;
            }
        }
    }
});

