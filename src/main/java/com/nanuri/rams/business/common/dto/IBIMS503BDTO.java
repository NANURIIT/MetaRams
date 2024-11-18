package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 인프라사업기본 Table.IBIMS503B DTO
*/
public class IBIMS503BDTO {
    private String         dealNo;               // 딜번호
    private String         sq;               	 // 일련번호
    private String         invFnnBusiWyDcd;      // 투자금융사업방식구분코드
    private String         busiSclCntn;          // 사업규모내용
    private String         busiLcsiDt;           // 사업인허가일자
    private String         cnfnDt;               // 준공일자
    private String         mngtCmpNm;            // 주관회사명
    private String         cnrStrtDt;            // 공사시작일자
    private String         cnrEndDt;             // 공사종료일자
    private String         brwrSpcYn;            // 차주SPC여부
    private String         oprtStrtDt;           // 운영시작일자
    private String         oprtEndDt;            // 운영종료일자
    private String         apvlYn;               // 승인여부
    private String         bzplAddr;             // 사업장주소
    private String         lmtYn;                // 한도여부
    private BigDecimal     invstAmt;             // 투자금액
    private String         busiRvoDcd;           // 사업수주구분코드
    private String         useStrtDt;            // 사용시작일자
    private BigDecimal     slfCpta;              // 자기자본금
    private BigDecimal     prorLoanAmt;          // 선순위대출금액
    private BigDecimal     bkbnLoanAmt;          // 후순위대출금액
    private String         bondTrnsYn;           // 채권이관여부
    private String         mngmCndFlflYn;        // 관리조건이행여부
    private String         fnnrCtrcMttrTrgtYn;   // 재무약정사항대상여부
    private String         delYn;                // 삭제여부
    private Date           hndDetlDtm;           // 조작상세일시
    private String         hndEmpno;             // 조작사원번호
    private String         hndTmnlNo;            // 조작단말기번호
    private String         hndTrId;              // 조작거래id
    private String         guid;                 // guid
}