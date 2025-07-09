package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Getter
@Setter
@ToString
public class IBIMS752BDTO {

	private String lmtFcsSn; // 한도정보집중일련번호
	private String errDcd; // 오류코드(K002)
	private String stdrDt; // 기준일자
	private String rptsDcd; // 보고서구분(K015)
	private String sn; // 일련번호
	private String prcsDcd; // 처리구분(K009)
	private String rgstRsnOcrncDt; // 등록사유발생일자
	private String lastChngDt; // 최종변경일자
	private String brwrDcd; // 차주구분(K008)
	private String crno; // 법인등록번호
	private String bzno; // 사업자등록번호
	private String eprzNm; // 상호명
	private String rprsNm; // 대표자명
	private String lmtInfSbjCd; // 한도정보과목코드(K010)
	private String revLimitAmt; // 회전한도금액(천원)
	private String loanBlce; // 대출잔액(천원)
	private String bondIsttDcd; // 최초채권기관(K006)
	
	private String trNo; // 거래번호
	private String jobDcd; // 업무구분(K013)
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
	private String sbjCd; // 과목코드
	private String amt; // 금액(천원)
	
	private String scrnDcd;//화면구분
    
}
