package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
/*
 딜기본정보 Table.IBIMS101B VO
*/
public class IBIMS101BVO extends IBIMS101BDTO {

    private String dscDt;
    private String dprtCd;					// 부서코드
    private String dprtNm;					// 부서명
    private String empNm;					// 사원명
    private String entpHnglNm;				// 업체한글명
    private String csucCmpDscmNm;	    	// 시공사한글명
    private String mngmBdnm;				// 관리부점명

    //워크플로우용
    private String prdtCd;				// 상품코드
    private String prdtNm;				// 상품명
    private String mtrNm; //안건명
    private String mtrDcd;
    private String dealSn; //딜일련번호
    private String jdgmSn; //심사일련번호
    //private BigDecimal apvlAmt;
    //private BigDecimal eprzCrdlApvlAmt;
    private String apvlAmt;
    private String eprzCrdlApvlAmt;
    private String eprzCrdlCtrcAmt;
    private String loanAmt;
    private String dealExcBlce;
    private String eprzCrdlIntrBnaoDcd;
    private String trOthrDscmNo;
    private String bzepName;
    private String entpNm;
    private String jdgmNm;
    private String rdmpTmrd; //상환회차
    private String mtrPrgSttsNm;
    //private BigDecimal ctrcAmt;
    private String ctrcAmt;
    private String prgSttsCd; //진행상태코드
    private String prgSttsNm; //진행상태명
    private String invPrdtLclsNm; //상품대분류명
    private String ctrcCclcDcd; //약정해지구분코드

    private BigDecimal excBlce; //사업 대출잔액
    private String busiNm;      //사업명
    private String crno;        //법인등록번호

    private String scrnNo;      // 화면번호!

    private String decdSttsDcd;  // 결재상태구분코드
}