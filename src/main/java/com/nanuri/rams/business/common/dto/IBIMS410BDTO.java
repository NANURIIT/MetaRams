package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 딜거래내역 Table.IBIMS410B DTO
*/
public class IBIMS410BDTO {
    private String        prdtCd              ; //상품코드
    private long          trSn                ; //거래일련번호
    private long          excSn               ; //실행일련번호
    private String        trDt                ; //거래일자
    private String        trStatCd            ; //거래상태코드
    private String        etprCrdtGrntTrKindCd; //거래종류코드
    private BigDecimal    dealTrAmt           ; //딜거래금액
    private BigDecimal    dealTrPrca          ; //딜거래원금
    private BigDecimal    trIntAmt            ; //거래이자금액
    private BigDecimal    dealRdptObjtPrca    ; //딜상환대상원금
    private BigDecimal    dealMrdpPrca        ; //딜중도상환원금
    private BigDecimal    nrmlIntAmt          ; //정상이자금액
    private BigDecimal    crdtGrntOvduIntAmt  ; //신용공여연체이자금액
    private BigDecimal    crdtGrntRcvbIntAmt  ; //신용공여미수이자금액
    private BigDecimal    pucrIntAmt          ; //환출이자금액
    private BigDecimal    trFeeAmt            ; //거래수수료금액
    private BigDecimal    costAmt             ; //비용금액
    private String        trCrcyCd            ; //거래통화코드
    private BigDecimal    wcrcTrslRt          ; //원화환산율
    private BigDecimal    wcrcTrslTrPrca      ; //원화환산거래원금
    private BigDecimal    wcrcTrslTrIntAmt    ; //원화환산거래이자금액
    private BigDecimal    wcrcTrslTrFeeAmt    ; //원화환산거래수수료금액
    private BigDecimal    wcrcTrslCostAmt     ; //원화환산비용금액
    private String        actgAfrsCd          ; //회계업무코드
    private String        actgUnitAfrsCd      ; //회계단위업무코드
    private String        actgTrCd            ; //회계거래코드
    private int           actgErlmSeq         ; //회계등록순번
    private String        rkfrDt              ; //기산일자
    private String        fndsDvsnCd          ; //자금구분코드
    private String        rctmIsttCd          ; //입금기관코드
    private String        rctmBano            ; //입금은행계좌번호
    private String        dpowName            ; //예금주명
    private String        hdwrPrcsYn          ; //수기처리여부
    private BigDecimal    acptPtclSmtlAmt     ; //수납내역합계금액
    private BigDecimal    dealAltnAmt         ; //딜대체금액
    private BigDecimal    dealCashAmt         ; //딜현금금액
    private BigDecimal    dealBkchAmt         ; //딜자기앞수표금액
    private BigDecimal    dealCkblAmt         ; //딜타점권금액
    private String        billPoutYn          ; //계산서출력여부
    private String        trbkPoutYn          ; //거래장출력여부
    private String        rclmDvsnCd          ; //회수구분코드
    private BigDecimal    pucrIntAltnAmt      ; //환출이자대체금액
    private BigDecimal    pucrIntRctmAmt      ; //환출이자입금금액
    private BigDecimal    clcnFeeAmt          ; //추심수수료금액
    private BigDecimal    imptStmpAmt         ; //수입인지금액
    private BigDecimal    feeTotAmt           ; //수수료총금액
    private String        rvseCnclDvsnCd      ; //정정취소구분코드
    private String        rvseCnclRsonText    ; //정정취소사유내용
    private int           rvseCnclTrSeq       ; //정정취소거래순번
    private BigDecimal    trAfLoanRmnd        ; //거래이후대출잔액
    private int           rdptTmod            ; //상환회차
    private BigDecimal    dealPxdfPrca        ; //딜대지급원금
    private BigDecimal    pxdfIntAmt          ; //대지급이자금액
    private BigDecimal    pxdfEtcAmt          ; //대지급기타금액
    private String        orgno               ; //조직번호
    private String        trStfno             ; //거래직원번호
    private String        dcfcStfno           ; //결재자직원번호
    private int           clmSeq              ; //청구순번
    private String        actgSynsCd          ; //회계적요코드
    private String        synsText            ; //적요내용
    private String        taxBillEvdcErlmDt   ; //세금계산서증빙등록일자
    private int           taxBillEvdcErlmSeq  ; //세금계산서증빙등록순번
    private int           taxBillPrcsSeq      ; //세금계산서처리순번
    private String        billEvdcErlmDt      ; //계산서증빙등록일자
    private int           billEvdcErlmSeq     ; //계산서증빙등록순번
    private int           billPrcsSeq         ; //계산서처리순번
    private BigDecimal    vat                 ; //부가세
    private String        issuBillEvdcErlmDt  ; //발행계산서증빙등록일자
    private int           issuBillPrcsSeq     ; //발행계산서처리순번
    private String        dfrmFeePrcaEclsYn   ; //지급수수료원금제외여부
    private BigDecimal    dfrmFeeClmObjtAmt   ; //지급수수료청구대상금액
    private BigDecimal    mrdpFeeAmt          ; //중도상환수수료금액
    private String        chckIssuIsttName    ; //수표발행기관명
    private String        mrdpYn              ; //중도상환여부
    private String        rctmDt              ; //입금일자
    private String        trObjtBsnNo         ; //거래대상기업체번호
    private BigDecimal    noprErngEtcAmt      ; //영업외수익기타금액
    private BigDecimal    noprCostEtcAmt      ; //영업외비용기타금액
    private String        rcvbRstrYn          ; //미수환원여부
    private String        rcvbYn              ; //미수여부
    private Date          hndDetlDtm          ; //조작상세일시
    private String        hndEmpno            ; //조작사원번호
    private String        hndTmnlNo           ; //조작단말기번호
    private String        hndTrId             ; //조작거래ID
    private String        guid                ; //GUID
}