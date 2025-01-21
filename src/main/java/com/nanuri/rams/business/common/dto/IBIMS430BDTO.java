package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
 부서별입금내역 Table.IBIMS430B DTO
*/
public class IBIMS430BDTO {

    private String      rctmDt;                  // 입금일자
    private long        rctmSeq;                 // 입금순번
    private String      fndsDvsnCd;              // 자금구분코드
    private String      dealNo;                  // ┌ 딜번호
    private String      prdtCd;                  // │ 종목코드
    private int         excSn;                   // │ 실행일련번호
    private int         feeSn;                   // │ 수수료일련번호
    private int         trSn;                    // │ 거래일련번호
    private String      rdmpTmrd;                // └ 상환회차
    private String      rdptObjtDvsnCd;          // 상환대상구분코드
    private BigDecimal  dealExcsPymtAmt;         // 딜초과납입금액
    private String      excsPymtPrcsDvsnCd;      // 초과납입처리구분코드
    private String      excsPymtPrcsText;        // 초과납입처리내용
    private BigDecimal  pmntPrarAmt;             // 납부예정금액
    private BigDecimal  dealRctmAmt;             // 딜입금금액
    private String      reltIsttCd;              // 관련기관코드
    private String      reltIsttNm;              // 관련기관명
    private String      reltBano;                // 관련은행계좌번호
    private String      mngmBdcd;                // 관리부점코드
    private String      dptrNm;                  // 입금자명
    private long        rgstSeq;                 // 등록순번
    private String      rgstEmpno;               // 등록사원번호
    private String      rgstBdcd;                // 등록부점코드
    private String      rgstDtm;                 // 등록일시
    private String      hndDetlDtm;              // 조작상세일시
    private String      hndEmpno;                // 조작사원번호
    private String      hndTmnlNo;               // 조작단말기번호
    private String      hndTrId;                 // 조작거래ID
    private String      guid;                    // GUID

}
