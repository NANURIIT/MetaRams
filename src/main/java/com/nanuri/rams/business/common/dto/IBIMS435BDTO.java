package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/**
 * 입금내역
 */
public class IBIMS435BDTO {

    private String rctmDt;           /* 입금일자 */
    private long rgstSeq;            /* 등록순번 */
    private String rgstBdcd;         /* 등록부점코드 */
    private String fndsDvsnCd;       /* 자금구분코드 */
    private BigDecimal pmntPrarAmt;  /* 납부예정금액 */
    private BigDecimal dealRctmAmt;  /* 딜입금금액 */
    private String reltIsttCd;       /* 관련기관코드 */
    private String reltIsttNm;       /* 관련기관명 */
    private String reltBano;         /* 관련은행계좌번호 */
    private String dptrNm;           /* 입금자명 */
    private String hndDetlDtm;       /* 조작상세일시 */
    private String hndEmpno;         /* 조작사원번호 */
    private String hndTmnlNo;        /* 조작단말기번호 */
    private String hndTrId;          /* 조작거래ID */
    private String guid;             /* GUID */
    
}
