package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB09012SVO {
    //

    //
    private String cpdgFcsSn; // 법인채무보증집중일련번호
    private String errDcd; // 오류코드(K002)
    private String stdrDt; // 기준일자
    private String rptsDcd; // 보고서구분(K015)
    private int sn; // 일련번호
    private String prcsDcd; // 처리구분(K009)
    private String rgstRsnOcrncUt; // 등록사유발생일자
    private String lastChngDt; // 최종변경일자
    private String brwrDcd; // 차주구분(K008)
    private String crno; // 법인등록번호
    private String bzno; // 사업자등록번호
    private String eprzNm; // 상호명
    private String rprsNm; // 대표자성명
    private String sbjCd; // 과목코드(K016)
    private BigDecimal amt; // 금액(천원)

    private String rgstDt; // 등록일자
    private String scrnDcd;// 화면구분
    private String jobDcd;// job구분
}
