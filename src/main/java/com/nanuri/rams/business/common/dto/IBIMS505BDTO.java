package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 국제투자사업기본 Table.IBIMS505B DTO
*/
public class IBIMS505BDTO {
    private String         dealNo;               // 딜번호
    //private String         sq;               	 // 일련번호(메타 변경 전)
    private long         sn;               	     // 일련번호
    private String         invFnnTrgtAsstDcd;    // 투자금융대상자산구분코드
    private String         brwrNtnNm;            // 차주국가명
    private BigDecimal     totBusiCt;            // 총사업비용
    private String         ntnNm;                // 국가명
    private String         guasDvsnCtns;         // 보증서구분내용
    private BigDecimal     prorRto;              // 선순위비율
    private BigDecimal     bkbnRto;              // 후순위비율
    private BigDecimal     cerkRto;              // 중간순위비율
    private String         lesStrtDt;            // 리스시작일자
    private String         lesEndDt;             // 리스종료일자
    private BigDecimal     mnum;                 // 개월수
    private String         loanStrtDt;           // 대출시작일자
    private String         loanEndDt;            // 대출종료일자
    private BigDecimal     loanMnum;             // 대출기간개월수
    private String         dvcTyCnts;            // 기종내용
    private String         prdcCmpCnts;          // 제작회사내용
    private String         mnfYr;                // 제조년도
    private String         invFnnLesKndDcd;      // 투자금융리스종류규분코드
    private String         lesMgcoNm;            // 리스운용사명
    private String         lesUserCnts;          // 리스이용자내용
    private String         brwrSpcYn;            // 차주SPC여부
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