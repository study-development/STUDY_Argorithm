function beforeValidationKE_keyin(){
	if(urlCheck("air11st/mobile")){ 
		// 최용석(2018-12-21) : 11번가(PC/M) 결제 동의 사항 유효성 검사
		var ruleCheck = true;
		var uncheckRule = "";
		var ruleId = "#ruleCheck";

		jQuery.each(jQuery("input:checkbox[id*='ruleAgreement']"), function(i){
			ruleId = "#ruleAgreement"+ (i+1);
			var checked = jQuery(ruleId).is(":checked");

			if(!checked){r
				uncheckRule = name_map.get(i+1);
				ruleCheck = false;
				return false;

			}else{
				map.put((i+1), checked);
			}
		});

		if(!ruleCheck) {
			alert(uncheckRule + "을(를) 동의 후 결제 가능합니다.");
			jQuery(ruleId).focus();
			return;
		}
		
		// 최용석(2018-12-21) : 11번가 카드 번호 유효성 검사
		var cc_account = "";
		
		jQuery.each(jQuery("intpu[id*=CC_ACCOUNT_]"), function(){
			cc_account += jQuery(this).val();
		});
		
		if(cc_account.length < 14){
			alert("올바른 카드번호를 입력해주세요.");
			return false;
			
		}
		
		jQuery("#CC_ACCOUNT").val(cc_account);
	}else{
		// 최용석(2018-12-21) : TMON,EBAY(PC/M) 결제 동의 사항 유효성 검사
		if(jQuery("#agreeRule").prop("checked")==false){
			alert("규정에 동의해 주시기 바랍니다.");
			return false;
		}
	}// 11번가 및 기타 제휴사 결제 전 동의 사항 유효성 검사 끝
	
	
}

//제휴사 PC/M 공통으로 적용 가능한 validation
function commonTagValidation(){
	// 결제 전 동의 사항 유효성 검사(11번가 m 제외)
	if(jQuery("#agreeRule").prop("checked")==false){
		alert("규정에 동의해 주시기 바랍니다.");
		return false;
	}
	
	if( jQuery("#ACCOUNT_CODE").val() == "" ) {
		alert("카드 종류를 선택해 주세요");
		jQuery("#ACCOUNT_CODE").focus();
		return false;
	}
	
//	모바일 공통 항목
	if( jQuery("#EXP_DATE_Y").val() == "" ) {
		alert("유효기간을 선택해 주세요");
		return false;
	}
	
	if( jQuery("#EXP_DATE_M").val() == "" ) {
		alert("유효기간을 선택해 주세요");
		return false;
	}
	
	if( jQuery("#CARD_PWD").val() == "" || jQuery("#CARD_PWD").val().length < 2 ) {
		alert("비밀번호를 입력해 주세요");
		jQuery("#CARD_PWD").focus();
		return false;
	}
//	모바일 공통 항목 끝
}



/* 최용석 KE_KEYIN 유효성 검사
 * 검사항목
 *	1. 결제 전 동의사항 체크 여부
 *  2. 카드 종류
 *  3. 할부기간
 *  4. 카드번호
 *  5. 카드소유주
 *  6. 생년월일
 *  7. 성별정보
 *  8. 유효기간
 *  9. 비밀번호
 * 
 */

