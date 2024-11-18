package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.poi.hpsf.GUID;

@Getter
@Setter
/*
 연체내역 Table.IBIMS437B DTO
*/
public class IBIMS437BDTO {
    private String afctMngmNo	        ; //사후관리번호
    private BigDecimal excSeq	                ; //실행순번
    private String dealNo	                ; //딜번호
    private BigDecimal ovduSeq	            ; //연체순번
    private String ovduOcrncDt	        ; //연체발생일자
    private BigDecimal crdlBlceAmt           ; //여신잔액금액
    private BigDecimal rdmpPrna           	; //상환원금
    private BigDecimal rdmpIntrAmt	        ; //상환이자금액
    private BigDecimal ovduPrnaAmt       	; //연체원금금액
    private BigDecimal ovduIntrAmt       	; //연체이자금액
    private String delYn              	; //삭제여부
    private Date hndDetlDtm        	; //조작상세일시
    private String hndEmpno           	; //조작사원번호
    private String hndTmnlNo	            ; //조작단말기번호
    private String hndTrId	            ; //조작거래ID
    private String guid	                ; //GUID
    

}