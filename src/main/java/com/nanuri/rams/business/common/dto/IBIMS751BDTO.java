package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Getter
@Setter
@ToString
public class IBIMS751BDTO {

	private String crdtGrntFcsSn; // 신용공여집중일련번호
	private String errDcd; // 오류코드(K002)
	private String jobDcd; // 업무구분(K013)
	private String prcsDcd; // 처리구분(K009)
	private String rgstDt; // 등록일자
	private String chngDt; // 변경일자
	private String brwrDcd; // 차주구분(K008)
	private String crno; // 법인등록번호
	private String bzno; // 사업자번호
	private String eprzNm; // 상호명
	private String indTypCd; // 업종코드
	private String actsDcd; // 계정과목(K007)
	private String crdtGrntBlce; // 신용공여잔액
	private String trNo; // 거래번호
	private String prdtNm; // 상품명
	private String expDt; // 만기일자
	private String intrt; // 금리
	private String rdmpWyDcd; // 상환방식(K003)
	private String dfrMnum; // 거치개월
	private String dfrEndDt; // 거치종료일
	private String mrtgTpDcd; // 담보유형(K012)
	private String bondIsttDcd; // 최초채권기관(K006)
	private String ovduDcd; // 연체여부(K005)
	private String ovduRsnDcd; // 연체사유(K004)
	private String depDt; // 상각일자
	private String prnaOvduAmt; // 원금연체금액
	private String intrOvduAmt; // 이자연체금액
	private String ovduOcrncDt; // 연체발생일자
	private String fwdgYn; // 전송여부
	
	private String msgTransSn; // 전문송신일련번호
	private String errDpch; // 오류통보
	private String transDt; // 송신일자
	private String stdrDt; // 기준일자
	private String trDcd; // 거래구분(K014)
	private String fileMsgNm; // 파일전문명
	private String sendCnt; // 발송건수
	private String sendTm; // 발송시간
	private String sendRslt; // 발송결과

	private String errDpchSn; // 오류통보일련번호
	private String rcptDt; // 수신일자
	private String sn; // 일련번호
	private String dataDcd; // Data구분
	private String errCtns; // 오류내용
	private String sbjCd; // 과목코드
	private String amt; // 금액(천원)
	
	private String scrnDcd;//화면구분
    
}
