package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@ToString
/*

*/
public class IBIMS754BDTO {

    private String cpdgFcsSn; // 법인채무보증집중일련번호
    private String errDcd; // 오류코드(K002)
    private String stdrDt; // 기준일자
    private String rptsDcd; // 보고서구분(K015)
    private int sn; // 일련번호
    private String prcsDcd; // 처리구분(K009)
    private String rgstRsnOcrncDt; // 등록사유발생일자
    private String lastChngDt; // 최종변경일자
    private String brwrDcd; // 차주구분(K008)
    private String crno; // 법인등록번호
    private String bzno; // 사업자등록번호
    private String eprzNm; // 상호명
    private String rprsNm; // 대표자성명
    private String sbjCd; // 과목코드(K016)
    private BigDecimal amt; // 금액(천원)

    private Date hndDetlDtm; // 조작상세일시
    private String hndEmpno; // 조작사원번호
    private String hndTmnlNo; // 조작단말기번호
    private String hndTrId; // 조작거래id
    private String guid; // guid

    private String rgstDt; // 등록일자

    private String msgTransSn; // 전문송신일련번호
    private String errDpch; // 오류통보
    private String transDt; // 송신일자
    private String trDcd; // 거래구분(K014)
    private String fileMsgNm; // 파일전문명
    private String sendCnt; // 발송건수
    private String sendTm; // 발송시간
    private String sendRslt; // 발송결과

    private String errDpchSn; // 오류통보일련번호
    private String rcptDt; // 수신일자
    private String dataDcd; // Data구분
    private String errCtns; // 오류내용
    private String trNo; // 거래번호
    private String bondIsttDcd; //

    private String scrnDcd;// 화면구분
    private String jobDcd;// job구분

}
