package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사기본 table(IBIMS103BDTO) DTO */
public class IBIMS103BDTO {
    private String     dealNo;                        // 딜번호
    private String     dealNm;                        // 딜명
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private int        sn;                            // 일련번호
    private String     lastYn;                        // 최종여부
    private String     mtrPrgSttsDcd;                 // 안건진행상태구분코드
    private String     mtrNm;                         // 안건명
    private String     mtrAbbrNm;                     // 안건약어명
    private String     raRsltnDcd;                    // RA결의구분코드
    private String     raDealDcd;                     // RADEAL구분코드
    private String     riskRcgNo;                     // 리스크승인번호
    private String     inspctDprtDcd;                 // 심사부서구분코드
    private String     invPrdtLclsCd;                 // 투자상품대분류코드
    private String     invPrdtMdclCd;                 // 투자상품중분류코드
    private String     invPrdtSclsCd;                 // 투자상품소분류코드
    private String     invPrdtDtlsDvdCd;              // 투자상품상세분류코드
    private String     mainInvstTrgtNm;               // 주요투자대상명
    private String     ptfdCrryCd;                   // 부의통화코드
    private BigDecimal ptfdAmt;                       // 부의금액
    private String     invNtnCd;                      // 투자국가코드
    private BigDecimal aplyExrt;                     // 적용환율
    private BigDecimal krwTrslPtfdAmt;                // 원화환산부의금액
    private String     indTypDvdCd;                   // 업종분류코드(고위험산업)
    private String     checkItemCd;                   // 점검항목코드(업무구분)
    private String     raBsnsZoneCd;                  // RA사업지역코드
    private String     invstThingDcd;                 // 투자물건구분코드
    private String     invstThingDtlsDcd;             // 투자물건상세구분코드
    private String     dlDprtCd1;                     // 거래부점코드1
    private String     dlDprtCd2;                     // 거래부점코드2
    private String     dlDprtCd3;                     // 거래부점코드3
    private String     dlDprtNm1;                     // 거래부점명1
    private String     dlDprtNm2;                     // 거래부점명2
    private String     dlDprtNm3;                     // 거래부점명3
    private String     hdqtCd;                        // 본부코드
    private String     dbcd;                          // 부점코드
    private String     dprtCd;                        // 부서코드  
    private String     chrrEmpno;                     // 담당자사번
    private String     ownPEno;                       // 심사역사번
    private String     esgYn;                         // ESG여부
    private String     esgMngDmnCd;                   // ESG관리영역코드
    private String     esgInvstAmtCd;                 // ESG투자금액코드
    private String     esgInvstTrgtCd;                // ESG투자대상코드
    private String     esgRiskInspctTrgtDcd;          // ESG리스크심사대상구분코드
    private String     bsnsDprtEsgGrdDcd;             // 사업부서ESG등급구분코드
    private String     bsnsDprtEsgGrdCmmt;            // 사업부서ESG등급의견
    private String     inspctDprtEsgGrdDcd;           // 심사부서ESG등급구분코드
    private String     inspctDprtEsgGrdCmmt;          // 심사부서ESG등급의견
    private int        invPrdMnum;                    // 투자기간개월수
    private String     wrtExptDt;                     // 기표예정일자
    private String     mtrtExptDt;                    // 만기예정일자
    private BigDecimal tlErnAmt;                      // 전체수익
    private BigDecimal wrtErnAmt;                     // 기표수익금액(수수료수익)
    private BigDecimal rcvblErnAmt;                   // 미수수익금액(투자수익)
    private String     mrtgOfrYn;                     // 담보제공여부
    private String     ensrYn;                        // 보증여부
    private String     rspsbCmplDcd;                  // 책임준공구분코드
    private String     entpNm;                        // 업체명
    private String     bzno;              		      // 사업자등록번호
    private String     corpNo;                        // 법인번호
    private String     corptnTypCd;                   // 협업유형코드
    private String     busiDptOpnn;                   // 사업부서의견
    private String     jdgmDptOpnn;                   // 심사부서의견
    private String     bscAstsInptExptF;              // 기초자산입력예정여부
    private String     insGrdInptExptF;               // 내부등급입력예정여부
    private String     cncCmpnyInptExptF;             // 연결회사입력예정여부
    private String     cnsbMtgNo;                     // 협의체회의번호(협의체구분코드_결의년도_일련번호)
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid
    private String     riskInspctRsltnCcd;
    private String     ownDt;
    //----------------------------- 20240613 정희조 추가 ----------------------------//
    private String     rsltnYr;                       // 결의년도

    
}