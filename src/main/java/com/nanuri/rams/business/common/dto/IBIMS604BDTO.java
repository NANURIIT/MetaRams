package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/**
 * ========================================
 * 파일명 : IBIMS604BDTO
 * 설명 : 일별신용사건현황 조회/전달용 데이터 전송 객체 (DTO)
 *
 * @Author : nanuri
 * @Date : 2025.07.10
 * @Version : 1.0
 * @History :
 *          - 2025.07.10 nanuri 최초작성
 *          ========================================
 */

public class IBIMS604BDTO {

    private String stdrDt; // 기준일자
    private String crno; // 법인등록번호
    private String dealNo; // 딜번호
    private String jdgmDcd; // 심사구분코드
    private String mtrDcd; // 부수안건구분코드
    private String entpNm; // 업체명
    private String rprstPHnglNm; // 대표자한글명
    private String grdDwnCnt1; // 등급하락건수1
    private String grdDwnCnt2; // 등급하락건수2
    private String arrsInfoCnt; // 연체정보건수
    private String fnclInfoCnt1; // 재무정보건수1
    private String fnclInfoCnt2; // 재무정보건수2
    private String clsQttCnt; // 휴폐업건수
    private String altnInvYn; // 대체투자여부
    private String fstCnfrDt; // 최초확인일자
    private String ansAcptDt; // 답변접수일자
    private String fstCnfrEmpno; // 최초확인사번
    private String ansAcptEmpno; // 답변접수사번

    private String ivtgRsltCtns; // 검토결과내용
    private Date hndDetlDtm; // 조작상세일시
    private String hndEmpno; // 조작사원번호
    private String hndTmnlUo; // 조작단말기번호
    private String hndTrId; // 조작거래id
    private String guid; // guid

}