package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 기일관리파라미터내역 Table.IBIMS982B DTO
 */
@Getter
@Setter
@ToString
public class IBIMS982BDTO {

    private String dudtMngmNo;          // 기일관리번호
    private int erlmSeq;                // 등록수넙ㄴ
    private String prmtId;              // 파라미터ID
    private String prmtCtns;            // 파라미터내용
    private String delYn;               // 삭제여부
    private Date hndDetlDtm;            // 조작상세일시
    private String hndEmpno;            // 조작사원번호
    private String hndTmnlNo;           // 조작단말기번호
    private String hndTrId;             // 조작거래ID
    private String guid;                // GUID

}
