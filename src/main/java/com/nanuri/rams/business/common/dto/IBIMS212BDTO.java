package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 IB승인담보연결내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS212B DTO
*/
public class IBIMS212BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         prdtCd;                                          // 상품코드
    private String         rgstDt;                                          // 등록일자
    private String         hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}