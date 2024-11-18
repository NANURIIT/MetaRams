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
    String dealNo;                          // 딜번호
    String icdcDcd;                         // 증감구분코드

    String prdtNm;                          // 종목코드명
    String etprCrdtGrntTrKindNm;            // 거래종류코드명

    String crryCd;                          // 통화코드
    String holdPrpsDcdNm;
    String trDptNm;
    String rqsEmpNm;
    String fndCd;                           // 펀드코드
    String fndNm;                           // 펀드명
    String fnltCd;                          // 외부기관코드
    String fnltNm;                          // 외부기관명
    BigDecimal stdrExrt;                    // 기준환율
    
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
    String dealNm; //딜명
    String prdtMdclCd; //중분류코드
    String rsltnDt; //조회시작일
    String rsltnEndDt; //조회마감일
    String bsnsRgstNo; //거래상대방
    String prdtMdclNm; //중분류코드명
    String trStatNm; //거래상태코드명
    String rvseCnclDvsnNm; //정정취소구분코드명
    String prgSttsCd; //진행상태코드
    String prgSttsNm; //진행상태코드명

    

    private List<IBIMS410BVO> trDtls;     // 거래내역
}