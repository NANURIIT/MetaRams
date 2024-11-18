package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 MA대출사업기본 Table.IBIMS504B DTO
*/
public class IBIMS504BDTO {
    private String         dealNo;               // 딜번호
    private String         sq;               	 // 일련번호
    private String         undwHglmWyDcd;        // 인수상한방식구분코드
    private String         hnvrBusiDcd;          // 인수사업구분코드
    private String         lmtTrYn;              // 한도거래여부
    private String         brwrSpcYn;            // 차주SPC여부
    private String         busiCtns;             // 사업내용
    private String         undwMrtgCtns;         // 인수담보내용
    private String         spnsrCtns;            // 후원자내용
    private String         delYn;                // 삭제여부
    private Date           hndDetlDtm;           // 조작상세일시
    private String         hndEmpno;             // 조작사원번호
    private String         hndTmnlNo;            // 조작단말기번호
    private String         hndTrId;              // 조작거래id
    private String         guid;                 // guid
}