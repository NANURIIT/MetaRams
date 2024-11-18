package com.nanuri.rams.business.assessment.tb07.tb07070;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.dto.IBIMS420BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS348BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.vo.IBIMS348BVO;
import com.nanuri.rams.business.common.vo.IBIMS402HVO;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.TB07070SVO;
import com.nanuri.rams.com.acctPrcs.EtprCrdtGrntAcctProc;
import com.nanuri.rams.com.dto.EtprCrdtGrntAcctProcDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07070ServiceImpl implements TB07070Service {
	
 	@Autowired
 	private EtprCrdtGrntAcctProc acctProc;
	/* 승인수수료스케쥴기본 */
	private final IBIMS348BMapper ibims348BMapper;
	/* 약정기본 */
	private final  IBIMS401BMapper ibims401BMapper;
	/* 딜실행기본 */
	private final IBIMS402BMapper ibims402BMapper;
	/* 딜실행기본이력 */
	private final IBIMS402HMapper ibims402HMapper;
	/* 여신스케쥴 */
	private final IBIMS403BMapper ibims403BMapper;
	/* 여신스케쥴이력 */
	private final IBIMS403HMapper ibims403HMapper;
	/* 딜거래내역 */
	private final IBIMS410BMapper ibims410BMapper;
	/* 딜거래내역 */
	private final IBIMS420BMapper ibims420BMapper;
	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	/**
	 * 정정거래조회  IBIMS410BVO
	 */
	@Override
	public List<IBIMS410BVO> selectRvseTrInq(TB07070SVO paramData) {

		return ibims401BMapper.selectRvseTrInq(paramData);

	}

	/**
	 * 이후 거래 존재여부 확인 
	 */
	@Override
	public int selectAfChkTrsnIBIMS410B(IBIMS410BDTO param) {
		if(("10".equals(param.getEtprCrdtGrntTrKindCd()))
		 ||("20".equals(param.getEtprCrdtGrntTrKindCd()))){
			param.setEtprCrdtGrntTrKindCd("00");
		}
		return ibims410BMapper.selectAfChkTrsnIBIMS410B(param);
	}
	
	/**
	 * 정정거래실행
	 */
	@Override
	public int saveTrRvseInq(TB07070SVO param) {
		
		int rtvValue = 1;
		int afChkTrsnCnt = 0;
		int trsnCnt = 0;
		long oldTrSn = 0;
		String rkfrDt = LocalDate.now().toString().replace("-", "");

		try {
			
			if(("10".equals(param.getEtprCrdtGrntTrKindCd()))
			 ||("20".equals(param.getEtprCrdtGrntTrKindCd()))) { // 실행/상환인 경우
							
				IBIMS410BDTO in410Chkbdto = new IBIMS410BDTO();
				in410Chkbdto.setPrdtCd(param.getPrdtCd());
				in410Chkbdto.setExcSn(param.getExcSn());
				in410Chkbdto.setTrSn(param.getTrSn());		
				if(("10".equals(param.getEtprCrdtGrntTrKindCd()))
				 ||("20".equals(param.getEtprCrdtGrntTrKindCd()))) {
					in410Chkbdto.setEtprCrdtGrntTrKindCd("00");
				} else {
					in410Chkbdto.setEtprCrdtGrntTrKindCd(param.getEtprCrdtGrntTrKindCd());
				}
				afChkTrsnCnt = ibims410BMapper.selectAfChkTrsnIBIMS410B(in410Chkbdto);
				if(afChkTrsnCnt > 0) {
					rtvValue = 0;
					throw new Exception("######### ERROR 처리하려는 정정/취소건은 최종 거래가 아닙니다. >> 종목코드["+param.getPrdtCd()+"] 실행일련번호["+param.getExcSn()+"] 거래일련번호["+param.getTrSn()+"]");
				} else {
					
					IBIMS402BDTO in402hbdto = new IBIMS402BDTO(); 
					in402hbdto.setPrdtCd(param.getPrdtCd());
					in402hbdto.setExcSn(param.getExcSn());
					// 최종 실행이력 조회
					IBIMS402BDTO out402Lstbdto = ibims402HMapper.selectLastIBIMS402H(in402hbdto);
					// 최종 직전 실행이력 조회
					IBIMS402BDTO out402BfSnbdto = ibims402HMapper.selectBfSnIBIMS402H(out402Lstbdto);

					// 정상거래가 최종인 경우
					trsnCnt = ibims410BMapper.selectTrsnCntIBIMS410B(in410Chkbdto);
					
					if(out402BfSnbdto == null) {
						System.out.println(">> 1. out402BfSnbdto ["+out402BfSnbdto+"] out402Lstbdto["+out402Lstbdto+"] <<");
						out402Lstbdto.setLdgSttsCd("2"); // 2취소
						// 취소전 실행이력으로 실행원장 UPDATE
						rtvValue = ibims402BMapper.uptExcIBIMS402B(out402Lstbdto);
						// 실행원장 UPDATE건 실행이력 생성 INSERT
						rtvValue = ibims402HMapper.insertIBIMS402H(out402Lstbdto);		
						rtvValue = ibims402HMapper.deleteIBIMS402H(out402Lstbdto);	
					} else {
						System.out.println(">> 2. out402BfSnbdto ["+out402BfSnbdto+"] out402Lstbdto["+out402Lstbdto+"] <<");
						// 취소전 실행이력으로 실행원장 UPDATE
						rtvValue = ibims402BMapper.uptExcIBIMS402B(out402BfSnbdto);
						// 실행원장 UPDATE건 실행이력 생성 INSERT
//						rtvValue = ibims402HMapper.insertIBIMS402H(out402BfSnbdto);	
						rtvValue = ibims402HMapper.deleteIBIMS402H(out402Lstbdto);			
					}		
					
					// 최종거래내역조회
					IBIMS410BDTO in410bdto = new IBIMS410BDTO();
					in410bdto.setPrdtCd(param.getPrdtCd());
					in410bdto.setExcSn(param.getExcSn());
					in410bdto.setTrSn(param.getTrSn());
					IBIMS410BDTO out410bdto = ibims410BMapper.selectlastIBIMS410B(in410bdto);
					oldTrSn = out410bdto.getTrSn();	// 이전 거래일련번호
					out410bdto.setTrStatCd("11");	// 11취소원거래, 12취소거래
					// 현재거래내역에 거래상태를 취소원거래로 변경
					rtvValue = ibims410BMapper.updateChgSttsCd410B(out410bdto);
					// 거래일련번호 채번
					int iExTrSn = ibims410BMapper.getExTrSn(out410bdto);
					out410bdto.setTrSn(iExTrSn);
					out410bdto.setTrStatCd("12");	// 11취소원거래, 12취소거래 
					out410bdto.setRvseCnclRsonText(param.getRvseCnclRsonText());
					out410bdto.setEtprCrdtGrntTrKindCd(param.getEtprCrdtGrntTrKindCd());
					// 취소거래내역 생성
					rtvValue = ibims410BMapper.saveDlTrList(out410bdto);

					IBIMS403BVO in403bvo = new IBIMS403BVO();
					in403bvo.setPrdtCd(param.getPrdtCd());
					in403bvo.setExcSn(param.getExcSn());
					in403bvo.setHgrkTrSn(oldTrSn);
					List<IBIMS403BDTO> out403BList = ibims403HMapper.selectIBIMS403H(in403bvo); // 이전 거래일련번호에 해당하는 여신스케쥴리스트 조회
					if(out403BList == null) {
						rtvValue = ibims403BMapper.deleteIBIMS403B(in403bvo);	// 종목+실행일련 대상 스케쥴 전체삭제
					} else {
						rtvValue = ibims403BMapper.deleteIBIMS403B(in403bvo);	// 종목+실행일련 대상 스케쥴 전체삭제
						rtvValue = ibims403BMapper.saveRdmpInfo(out403BList);	// 여신스케쥴저장
					}
					rtvValue = ibims403HMapper.deleteIBIMS403H(in403bvo);		// 여신스케쥴이력 삭제
				}
			
			} else if(("21".equals(param.getEtprCrdtGrntTrKindCd()))
			        ||("22".equals(param.getEtprCrdtGrntTrKindCd()))) { // 수수료수납21/수수료지급22인 경우
				
				IBIMS348BVO in348bvo = new IBIMS348BVO();
				in348bvo.setPrdtCd(param.getPrdtCd());
				in348bvo.setTrSn(param.getTrSn());
				IBIMS348BVO out348bvo = ibims348BMapper.selectTrsnFeeSnInfo(in348bvo);
				out348bvo.setFeeRcivDt("");
				out348bvo.setFeeRcivAmt(BigDecimal.ZERO);
				out348bvo.setTrSn(0);
				out348bvo.setPrcsCpltYn("0");
				rtvValue = ibims348BMapper.updateFeeScxInfo2(out348bvo);	// 딜승인수수료스케쥴기본 변경

				// 최종거래내역조회
				IBIMS410BDTO in410bdto = new IBIMS410BDTO();
				in410bdto.setPrdtCd(param.getPrdtCd());
				in410bdto.setExcSn(param.getExcSn());
				in410bdto.setTrSn(param.getTrSn());
				IBIMS410BDTO out410bdto = ibims410BMapper.selectlastIBIMS410B(in410bdto);
				oldTrSn = out410bdto.getTrSn();	// 이전 거래일련번호
				out410bdto.setTrStatCd("11");	// 11취소원거래, 12취소거래
				// 현재거래내역에 거래상태를 취소원거래로 변경
				rtvValue = ibims410BMapper.updateChgSttsCd410B(out410bdto);
				// 거래일련번호 채번
				int iTrSn = ibims410BMapper.getExTrSn(out410bdto);
				out410bdto.setTrSn(iTrSn);
				out410bdto.setTrStatCd("12");	// 11취소원거래, 12취소거래
				out410bdto.setRvseCnclRsonText(param.getRvseCnclRsonText());
				out410bdto.setEtprCrdtGrntTrKindCd(param.getEtprCrdtGrntTrKindCd());
				// 취소거래내역 생성
				rtvValue = ibims410BMapper.saveDlTrList(out410bdto);

				IBIMS420BDTO in420bdto = new IBIMS420BDTO();
				in420bdto.setPrdtCd(param.getPrdtCd());
				in420bdto.setExcSn(param.getExcSn());
				in420bdto.setTrSn(param.getTrSn());
				ibims420BMapper.deleteIBIMS420B(in420bdto);	// 수수료수납내역 삭제
								
			}
		
			EtprCrdtGrntAcctProcDTO inDTO = new EtprCrdtGrntAcctProcDTO();
			inDTO.setPrdtCd(param.getPrdtCd());
			inDTO.setExcSn(param.getExcSn());
			inDTO.setTrCrcyCd(param.getCrryCd());	  /* 거래통화코드 */
			inDTO.setTrAmt(BigDecimal.ZERO);
			inDTO.setTrPrca(BigDecimal.ZERO);	  			  /* 거래원금 */  
			inDTO.setTrIntAmt(BigDecimal.ZERO); 			  /* 거래이자금액 */
			inDTO.setRkfrDt(rkfrDt); 						  /* 기산일자 */
			inDTO.setCanYn("1");							  
			inDTO.setEtprCrdtGrntTrKindCd(param.getEtprCrdtGrntTrKindCd());	/* 거래종류코드 */
			EtprCrdtGrntAcctProcDTO outDTO = acctProc.acctPrcs(inDTO);
							
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}

		return rtvValue;
		
	}
	
} 