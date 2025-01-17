package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 자금품의결재
 */
public class IBIMS452BDTO {
    
    private String prdtCd;	                // 상품코드	IBIMS452B	varchar(32)
    private int excSeq;	            // 실행순번	IBIMS452B	decimal(16,0)
    private int trSeq;	                    // 거래순번	IBIMS452B	decimal(16,0)
    private int erlmSeq;	                // 등록순번	IBIMS452B	decimal(16,0)
    private String chrrDvsnCd;	            // 담당자구분코드	IBIMS452B	varchar(2)
    private String rqstStfno;	            // 신청직원번호	IBIMS452B	varchar(6)
    private String reltStfno;	            // 승인자	IBIMS452B	varchar(6)
    private String consDecdDvsnCd;	        // 품의결재구분코드	IBIMS452B	varchar(2)
    private String consDecdStatCd;	        // 결재상태코드	IBIMS452B	varchar(2)
    private String ovrsTrnsYn;              // 해외송금여부 IBIMS452B	varchar(2)
    private String rjctRsnCntn;	            // 반려사유내용	IBIMS452B	varchar(500)
    private Date hndDetlDtm;	            // 조작상세일시	IBIMS452B	datetime
    private String hndEmpno;	            // 조작사원번호	IBIMS452B	varchar(7)
    private String hndTmnlNo;	            // 조작단말기번호	IBIMS452B	varchar(8)
    private String hndTrId;	                // 조작거래ID	IBIMS452B	varchar(10)
    private String guid;	                // GUID	IBIMS452B	varchar(29)

}
