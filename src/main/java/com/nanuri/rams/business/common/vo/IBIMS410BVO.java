package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 딜거래내역 Table.IBIMS410B VO
*/
public class IBIMS410BVO extends IBIMS410BDTO {
    private String dealNo;                          // 딜번호
    private String icdcDcd;                         // 증감구분코드

    private String prdtNm;                          // 종목코드명
    private String etprCrdtGrntTrKindNm;            // 거래종류코드명

    private String crryCd;                          // 통화코드
    private String holdPrpsDcdNm;
    private String trDptNm;
    private String rqsEmpNm;
    private String fndCd;                           // 펀드코드
    private String fndNm;                           // 펀드명
    private String fnltCd;                          // 외부기관코드
    private String fnltNm;                          // 외부기관명
    private BigDecimal stdrExrt;                    // 기준환율
    
    private String trNm;                    // 거래명
    
    private String        prdtClsfCd      ;	// 기업여신상품분류코드
    private String        mngmBdcd        ; // 부서코드
    private String        dprtNm          ; // 부서명
    private String        chrrEmpno       ; // 담당자사원번호        
    private String        chrrEnm         ; // 담당자명

    private String prevDate;
    private String nextDate;
    private String consDecdStatCd;              /* 결재상태  452B */
    private String trObjtBsnNo;                 /* 거래처번호 */
    private String bzepName;                    /* 거래처명  010B */
    private String rqstStfno;                   /* 담당자 452B */
    private String reltStfno;                   /* 승인자 452B */
    private String rqstStfnm;                   
    private String reltStfnm;                   
    private String gbckRsonText;                /* 반려사유  452B */
    private BigDecimal eprzCrdlCtrtAmt;         /* 계약금액  401B */
    private String bnkBd;                       /* 은행부실점명 */
    private Date hndDetlDtm;                    /* 처리시간  452B */
    private BigDecimal invAmt;                  /* 투자금액  201B */
    private String consDecdDvsnCd;
    private Date trDtm;                         /* 거래시간 */
    private Date hndlDtm;                       /* 처리시간 */


    //String dealNo; //딜번호
    private String dealNm; //딜명
    private String prdtMdclCd; //중분류코드
    private String rsltnDt; //조회시작일
    private String rsltnEndDt; //조회마감일
    private String bsnsRgstNo; //거래상대방
    private String prdtMdclNm; //중분류코드명
    private String trStatNm; //거래상태코드명
    private String rvseCnclDvsnNm; //정정취소구분코드명
    private String prgSttsCd; //진행상태코드
    private String prgSttsNm; //진행상태코드명

    

    private List<IBIMS410BVO> trDtls;     // 거래내역
}