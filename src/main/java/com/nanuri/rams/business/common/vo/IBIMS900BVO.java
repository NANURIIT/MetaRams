package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS900BDTO;
import com.nanuri.rams.business.common.dto.IBIMS901BDTO;
import com.nanuri.rams.business.common.dto.IBIMS902BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS900BVO extends IBIMS900BDTO {

    private String fincExcuRqsDt1;
    private String fincExcuRqsDt2;
    private String decdStepDcd;     // 결재단계구분코드

    private String apvlRqstPEno;    // 요청자사번
    private Date rqstDtm;           // 신청일시
    private BigDecimal rndrInAmt;   // 입금합계
    private BigDecimal rndrOutAmt;  // 출금합계
    private String trDt;            // 거래일자
    private String fromDate;        // 거래일자
    private String toDate;          // 거래일자

    private List<IBIMS901BDTO> pblHisList;          // 유동화증권방행내역
    private List<IBIMS902BDTO> dpstRqstList;        // 입금요청내역
    private List<IBIMS902BDTO> wthdrwlRqstList;     // 출금요청내역
    
    // 잔고현황 In
    private String fromMm;              /* 조회시작년월 */
    private String toMm;                /* 조회종료년월 */
    private String decdSttsDcd;         /* 결재상태구분코드 */

    // 잔고현황 Out
    private String trMm;                /* 거래년월 */
    private String dprtNm;              /* 관리부서명 */
    private String spcNm;               /* SPC명 */
    private BigDecimal bfmmRndrBlce;    // 전월말잔액
    private BigDecimal thmmRndrBlce;    // 당월말잔액
    private BigDecimal depAmtTot;       // 입금합계
    private BigDecimal depAmt01;        // 기초자산 원리금(입금)
    private BigDecimal depAmt02;        // 유동화증권 인수대금(입금)
    private BigDecimal depAmt03;        // 원천세 환급(입금)
    private BigDecimal depAmt04;        // 후순위대여 입금(입금)
    private BigDecimal depAmt05;        // 기초자산 매각대금(입금)
    private BigDecimal depAmt06;        // 취급수수료(입금)
    private BigDecimal depAmt07;        // 자금운용 목적 계좌 회수(입금)
    private BigDecimal depAmt99;        // 기타(입금)
    private BigDecimal wdrAmtTot;       // 출금합계
    private BigDecimal wdrAmt01;        // 유동화증권 상환(출금)
    private BigDecimal wdrAmt02;        // 확약수수료(출금)
    private BigDecimal wdrAmt03;        // 자산관리수수료(출금)
    private BigDecimal wdrAmt04;        // 인수수수료(출금)
    private BigDecimal wdrAmt05;        // ABB/ABL 원리금(출금)
    private BigDecimal wdrAmt06;        // 원천세 납부(출금)
    private BigDecimal wdrAmt07;        // 후순위대여 상환(출금)
    private BigDecimal wdrAmt08;        // 대출 실행/추가 인출(출금)
    private BigDecimal wdrAmt09;        // 주관/주선수수료(출금)
    private BigDecimal wdrAmt10;        // 법무법인수수료(출금)
    private BigDecimal wdrAmt11;        // 업무위탁수수료(출금)
    private BigDecimal wdrAmt12;        // 회계감사수수료(출금)
    private BigDecimal wdrAmt13;        // 신용평가수수료(출금)
    private BigDecimal wdrAmt14;        // 대리금융수수료(출금)
    private BigDecimal wdrAmt15;        // 설립청산수수료(출금)
    private BigDecimal wdrAmt16;        // 취급수수료(출금)
    private BigDecimal wdrAmt17;        // 자금운용 목적 계좌(출금)
    private BigDecimal wdrAmt99;        // 기타(출금)
}
