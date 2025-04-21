package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
public class IBIMS402BVO extends IBIMS402BDTO {
	private String         eprzCrdlIntrBnaoDcd;                    // 기업여신이자선후취구분코드
    private String         eprzCrdlTfdLyAplyDcd;                   // 기업여신초일말일적용구분코드
    private String         eprzCrdlIntrSnnoPrcsDcd;                // 기업여신이자단수처리구분코드
    private String         eprzCrdlIntrClcEndDeDcd;                // 기업여신이자계산종료일구분코드
    private String         eprzCrdlPaiRdmpDcd;                     // 기업여신원리금상환구분코드
    private String         eprzCrdlIntrDnumClcMthCd;               // 기업여신이자일수계산방법코드
    private String         eprzCrdlOvduIntrRtDcd;                  // 기업여신연체이자율구분코드
    private String         eprzCrdlHldyPrcsDcd;                    // 기업여신휴일처리구분코드
    
    private String         actsCd;      // 계정과목
    private String         actsNm;      // 계정명
    private BigDecimal     eprzCrdlCtrcAmt; // 기업여신약정금액
    private String         prdtNm;      // 상품명
    private String         prdtClsfCd;  // 유가증권분류
    private String         ortnFndCd;   // 펀드유형상세
    private String         eprzCrdlLdgSttsCd;  // 원장상태코드
	private BigDecimal     buyShqt; 		// 매수좌수 
//	private BigDecimal     acbkAmt; 		// 장부금액(DTO중복선언)
	private BigDecimal     avrUnpr; 		// 평균단가
	
}
