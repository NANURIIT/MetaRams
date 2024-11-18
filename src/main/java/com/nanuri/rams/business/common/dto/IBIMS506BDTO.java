package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 PEF사업기본 Table.IBIMS506B DTO
*/
public class IBIMS506BDTO {
    private String         dealNo;               // 딜번호
    //private String         sq;               	 // 일련번호(메타 변경 전)
    private String         sn;               	 // 일련번호
    private String         invstStgyCtns;        // 투자전략내용
    private String         ctrcPclrCtns;         // 약정특이내용
    private String         busiPrgPclrCtns;      // 사업진행특이내용
    private String         bondTrnsYn;           // 채권이관여부
    private String         mngmCndFlflYn;        // 관리조건이행여부
    private String         chrgEmpno;        	 // 담당자
    private String         delYn;                // 삭제여부
    private Date           hndDetlDtm;           // 조작상세일시
    private String         hndEmpno;             // 조작사원번호
    private String         hndTmnlNo;            // 조작단말기번호
    private String         hndTrId;              // 조작거래id
    private String         guid;                 // guid
}