package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 부동산사업기본 Table.IBIMS502B DTO
*/
public class IBIMS502BDTO {
    private String         dealNo;               // 딜번호
    //private String         sq;               	 // 일련번호(메타 변경 전)
    private long         sn;               	     // 일련번호
    private String         guasMrtgYn;           // 보증서담보여부
    private String         efceMbdyDcd;          // 시행주체구분코드
    private String         busiLcsiCpltYn;       // 사업인허가완료여부
    private String         landOwnrsEnsuYn;      // 토지소유권확보여부
    private String         fndsMngmTrgtYn;       // 자금관리대상여부
    private String         cnrStrtDt;            // 공사시작일자
    private String         cnrEndDt;             // 공사종료일자
    private String         brwrSpcYn;            // 차주SPC여부
    private String         slltStrtDt;           // 분양시작일자
    private String         slltEndDt;            // 분양종료일자
    private String         apvlYn;               // 승인여부
    private BigDecimal     busiSiteSqms;         // 사업부지면적
    private BigDecimal     siteSqms;             // 대지면적
    private BigDecimal     busiArRt;             // 사업용적율
    private BigDecimal     busiTtlSqms;          // 사업연면적
    private BigDecimal     ttlSqms;              // 연면적
    private BigDecimal     busiBldngLndrt;       // 사업건폐율
    private String         eprzSclDcd;           // 기업규모구분코드
    private String         fcltSclWidhCtns;      // 시설규모너비내용
    private String         resiEcoCtns;          // 주거환경내용
    //private String         crdtRifcDvcDcd;       // 신용보강장치구분코드(메타 변경 전)
    private String         crdtRifcDcd;       // 신용보강장치구분코드
    private String         crdtRifcDvcNm;        // 신용보강장치명
    private String         bondTrnsYn;           // 채권이관여부
    private String         mngmCndFlflYn;        // 관리조건이행여부
    private String         fnnrCtrcMttrTrgtYn;   // 재무약정사항대상여부
    private String         bzplAddr;             // 사업장주소
    private String         bsnsAreaCd;           // 사업지역코드
    private String         rdmpCpltYn;           // 상환완료여부
    private String         delYn;                // 삭제여부
    private Date           hndDetlDtm;           // 조작상세일시
    private String         hndEmpno;             // 조작사원번호
    private String         hndTmnlNo;            // 조작단말기번호
    private String         hndTrId;              // 조작거래id
    private String         guid;                 // guid
}