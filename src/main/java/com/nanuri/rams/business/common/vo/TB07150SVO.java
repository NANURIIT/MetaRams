package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS346BDTO;
import com.nanuri.rams.business.common.dto.IBIMS404BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB07150SVO {
    
	private String        prdtCd;                  // 종목코드
	private long		  excSn;				   // 실행일련번호
	private String        trOthrDscmNo;			   // 거래상대방식별번호
	private String 		  trOthrDscmNm;			   // 거래상대방명
	private String 		  prgSttsCd;			   // 진행상태코드
	private String  	  mngmBdcd;			       // 관리부점코드
	private String 		  mngmBdnm;				   // 관리부점명
	private String        prdtClsfCd;              // 기업여신상품분류코드
	private String 		  prdtClsfNm;			   // 상품분류명
	private String        actsCd;                  // 계정과목코드	 
	private BigDecimal    eprzCrdlCtrcAmt;         // 기업여신약정금액 
	private String        ctrcDt;                  // 약정일자
	private String        ctrcExpDt;               // 약정만기일자
	private BigDecimal    eprzCrdlApvlAmt;         // 기업여신승인금액
	private String        paiRdmpDcd;              // 원리금상환구분코드
	private int           prnaRdmpFrqcMnum;        // 원금상환주기개월수
    private int     	  intrRdmpFrqcMnum;        // 이자상환주기개월수
	private BigDecimal    istmDtmRdmpAmt;          // 할부일시상환금액
	private String        indvLmtDcd;              // 기업여신개별한도구분코드
	private String        hldyPrcsDcd;             // 휴일처리구분코드
	private int           prnaDfrPrdMnum;          // 원금거치기간개월수
	private String        intrBnaoDcd;             // 이자선후취구분코드
	private String        intrDnumClcMthCd;        // 이자일수계산방법코드
	private BigDecimal    ovduIntrRt;              // 연체이자율

	private BigDecimal    chngBfEprzCrdlCtrcAmt;   // 변경 전 기업여신 약정금액 
	private String 		  chngDt;				   // 변경일자
	private String 		  rqsKndCd;				   // 조건변경 신청종류

	private IBIMS401BVO   chngBfLdgInf;            // 변경전원장정보 
	private IBIMS401BVO   cndChngInf;              // 조건변경정보
    private List<IBIMS346BDTO> chngBf346BList;     // 변경전승인금리정보
    private List<IBIMS346BDTO> cndChng346BList;    // 조건변경승인금리정보

	private List<IBIMS404BDTO> chngBf404BList;     // 변경전승인금리정보
    private List<IBIMS404BDTO> cndChng404BList;    // 조건변경승인금리정보
    
}
