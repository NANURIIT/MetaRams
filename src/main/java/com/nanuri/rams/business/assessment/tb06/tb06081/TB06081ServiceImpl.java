package com.nanuri.rams.business.assessment.tb06.tb06081;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.dto.IBIMS232BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS003BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB06081ServiceImpl implements TB06081Service {

	private final AuthenticationFacade facade;

	private final IBIMS003BMapper ibims003bMapper;
	private final IBIMS231BMapper ibims231bMapper;
	private final IBIMS232BMapper ibims232bMapper;

	@Override
	public List<IBIMS003BVO> srchApvlList(IBIMS003BVO paramData){

		paramData.setNowEmpno(facade.getDetails().getEno());

		return	ibims003bMapper.srchApvlList(paramData);
	}

	@Override
	public List<IBIMS003BVO> apvlListChk(IBIMS231BDTO paramData) {
		return ibims231bMapper.apvlListChk(paramData);
	}

	@Override
	public int apvlRqst(IBIMS231BVO paramData) {

		int result = 0;

		List<IBIMS231BDTO> apvlList = paramData.getApvlList();

		int decdSn = ibims231bMapper.getDecdSn();
		String apvlRqstPEno = facade.getDetails().getEno();

		for(int i = apvlList.size() - 1; i >= 0; i--){
			if( i == apvlList.size() - 1){
				/* IBIMS231B data */

				// 일련번호
				apvlList.get(i).setDecdSn(decdSn);
				// 최종결재순번
				apvlList.get(i).setLastDecdSq(apvlList.size());
				// 승인요청자사번
				apvlList.get(i).setApvlRqstPEno(apvlRqstPEno);
				// 마지막처리사원
				apvlList.get(i).setHndEmpno(apvlRqstPEno);
	
				ibims231bMapper.apvlRqst(apvlList.get(i));
			}

			/* IBIMS232B data */
			IBIMS232BDTO ibims232bdto = new IBIMS232BDTO();
			
			// 결재일련번호
			ibims232bdto.setDecdSn(decdSn);
			// 결재순번
			ibims232bdto.setDecdSq( apvlList.size() - i );
			// 결재상태구분코드
			ibims232bdto.setDecdSttsDcd( apvlList.get(i).getDecdSttsDcd() );
			// 결재자사번
			ibims232bdto.setDcfcEno( apvlList.get(i).getChrrEno() );
			// 조작사원번호
			ibims232bdto.setHndEmpno(apvlRqstPEno);

			ibims232bMapper.apvlRqst(ibims232bdto);

			result += 1;
		}

		return result;
	}

	@Override
	public int updateApvlRqst(IBIMS231BVO paramData) {

		int result = 0;

		// 1. 재승인요청 - decdSttsDcd === "1" && decdStepDcd = "02"
		// 2. 승인요청취소 - decdSttsDcd === "4" && decdStepDcd = "00"

		List<IBIMS231BDTO> apvlList = paramData.getApvlList();
		String hndEmpno = facade.getDetails().getEno();
		int decdSn = ibims231bMapper.decdSn(apvlList.get(0));
		
		for(int i = apvlList.size() - 1; i >= 0; i--){
			// 결재일련번호
			apvlList.get(i).setDecdSn(decdSn);
			// 마지막처리사원
			apvlList.get(i).setHndEmpno(hndEmpno);

			log.debug("체크용::::::" + apvlList.get(0).getDecdStepDcd());

			if(i == apvlList.size() - 1 && "02".equals(apvlList.get(i).getDecdStepDcd())){
				apvlList.get(i).setDecdSttsDcd("1");
				ibims231bMapper.updateDecd(apvlList.get(i));
			}
			else if(i == apvlList.size() - 1 && "00".equals(apvlList.get(0).getDecdStepDcd())){
				apvlList.get(i).setDecdSn(decdSn);
				ibims231bMapper.updateDecd(apvlList.get(i));
			}

			IBIMS232BDTO updateData = new IBIMS232BDTO();
			
			// 결재일련번호 set
			// 결재순번
			// 결재상태구분코드 set
			// 결재자사번
			// 결재일시
			// 결재자주석내용
			// 반려여부
			// 반려사유내용
			// 조작상세일시 ~ GUID

			// decdStepDcd 결재단계구분코드 - 00해당무, 01담당자작성중, 02재승인요청, 03담당자수정중, 04승인요청, 05결재완료
			// decdSttsDcd 결재상태구분코드 - 0해당없음, 1진행중, 2승인완료, 3반려, 4승인취소
			updateData.setDecdSn(decdSn);
			updateData.setDecdSq(i + 1);

			// 결재자상태확인. 반려만 재승인요청으로 되돌리기.
			String decdSttsDcd = ibims232bMapper.chkDecdSttsDcd(updateData);

			// 재승인요청시 반려는 진행중으로
			if ("3".equals(decdSttsDcd) && "02".equals(apvlList.get(i).getDecdStepDcd())){
				updateData.setDecdSttsDcd("1");
				updateData.setRjctYn("N");
			}
			// 재승인요청시 승인상태는 그대로
			else if ("2".equals(decdSttsDcd) && "02".equals(apvlList.get(i).getDecdStepDcd())) {
				updateData.setDecdSttsDcd("2");
			}
			// 나머지
			else {
				updateData.setDecdSttsDcd(apvlList.get(i).getDecdSttsDcd());
			}

			updateData.setHndEmpno(apvlList.get(i).getHndEmpno());
			ibims232bMapper.updateDecd(updateData);

			result += 1;
		}
		

		return result;
	}

}
