package com.nanuri.rams.business.assessment.tb06.tb06082;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.assessment.tb06.tb06082.decdJob.TB07200SJob;
import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.dto.IBIMS232BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB06082ServiceImpl implements TB06082Service {

	private final AuthenticationFacade facade;

	private final IBIMS231BMapper ibims231bMapper;
	private final IBIMS232BMapper ibims232bMapper;
	private final IBIMS201BMapper ibims201bMapper;
	private final TB07200SJob tb07200sJob;

	@Override
    public int decdUpdate(IBIMS231BVO paramData){

		IBIMS231BDTO dto231 = new IBIMS231BDTO();

		if("3".equals(paramData.getDecdSttsDcd())){
			dto231.setDecdStepDcd("04");
			dto231.setDecdSttsDcd("3");
		}
		else {
			dto231.setDecdStepDcd(paramData.getDecdStepDcd());		// 결재단계구분코드
			dto231.setDecdSttsDcd(paramData.getDecdSttsDcd());		// 결재상태구분코드
		}
		dto231.setDealNo(paramData.getDealNo());					// 딜번호
		dto231.setPrdtCd(paramData.getPrdtCd());					// 상품코드
		dto231.setDecdJobDcd(paramData.getDecdJobDcd());			// 결재업무구분코드
		dto231.setScrnNo(paramData.getScrnNo());					// 화면번호
		dto231.setApvlRqstCntn(paramData.getApvlRqstCntn());		// 승인요청내용
		dto231.setExcSeq(paramData.getExcSeq());					// 실행순번
		dto231.setRqstSq(paramData.getRqstSq());					// 신청순번
		dto231.setTrSeq(paramData.getTrSeq());						// 거래순번
		dto231.setHndEmpno(facade.getDetails().getEno());			// 처리사원번호

		/**
		 * 결재일련번호 체크
		 * @discription
		 * 업데이트전에 결재일련번호를 세팅해야함
		 */
		int decdSn = ibims231bMapper.decdSn(dto231);

		dto231.setDecdSn(decdSn);

		IBIMS232BDTO dto232 = new IBIMS232BDTO();

		dto232.setDecdSn(decdSn);
		dto232.setDcfcEno(facade.getDetails().getEno());		// 결재자사번

		int decdSq = ibims232bMapper.getDecdSq(dto232);			// 결재순번

		int lastDecdSq = ibims231bMapper.getLastDecdSq(decdSn);	// 최종결재순번 확인

		dto232.setDecdSq(decdSq);
		dto232.setDecdSttsDcd(paramData.getDecdSttsDcd());		// 결재상태구분코드
		dto232.setDcfcAnnoCntn(paramData.getDcfcAnnoCntn());	// 결재자주석내용
		dto232.setRjctRsnCntn(paramData.getRjctRsnCntn());		// 반려사유내용
		dto232.setHndEmpno(facade.getDetails().getEno());		// 처리사원번호

		if(lastDecdSq == decdSq && "2".equals(dto232.getDecdSttsDcd())){
			dto231.setDecdStepDcd("05");
			// 처리결과구분코드 정상
			dto231.setPrcsRsltDcd("01");
			ibims231bMapper.updateDecd(dto231);

			// 대출채권/채무보증, 집합투자증권, 주식(출자포함)/채권 정보등록 화면
			if ("TB06010S".equals(paramData.getScrnNo()) || "TB06020S".equals(paramData.getScrnNo()) || "TB06030S".equals(paramData.getScrnNo())) {
				IBIMS201BDTO dto201 = new IBIMS201BDTO();
				dto201.setPrdtCd(paramData.getPrdtCd());
				dto201.setPrgSttsCd("403");		// 승인정보부의합의완료
				ibims201bMapper.sttsUpdate(dto201);
			}

			// SPC 자금집행 업무지시요청 화면
			else if ( "TB07200S".equals(paramData.getScrnNo()) ) {
				tb07200sJob.updateRndrBlce(paramData.getDealNo());
			}
		}
		
		if("3".equals(dto232.getDecdSttsDcd())){
			// 처리결과구분코드 정상
			dto231.setPrcsRsltDcd("02");
			dto232.setRjctYn("Y");
		}

		if("3".equals(paramData.getDecdSttsDcd())){
			ibims231bMapper.updateDecd(dto231);
		}
		else if(ibims232bMapper.chkSttsDcd(decdSn) == 3){
			// 딜승인결재기본 업데이트
			ibims231bMapper.updateDecd(dto231);
		}

		return ibims232bMapper.updateDecd(dto232);

	};

}
