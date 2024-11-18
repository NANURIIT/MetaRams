package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
투자사후사업일정내역 Table.IBIMS514B DTO
*/
public class IBIMS514BDTO {
   private String         dealNo;                                   // 딜번호
   private int            sn;                                       // 일련번호
   private String         mainScxCtns;                              // 주요일정내용
   private String         prarDt;                                   // 예정일자
   private String         flflYn;                                   // 이행여부
   private String         flflDt;                                   // 이행일자
   private String         delYn;                                    // 삭제여부
   private Date           hndDetlDtm;                               // 조작상세일시
   private String         hndEmpno;                                 // 조작사원번호
   private String         hndTmnlNo;                                // 조작단말기번호
   private String         hndTrId;                                  // 조작거래id
   private String         guid;                                     // guid
}
