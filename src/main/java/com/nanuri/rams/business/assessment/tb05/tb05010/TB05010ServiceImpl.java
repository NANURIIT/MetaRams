package com.nanuri.rams.business.assessment.tb05.tb05010;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.IBIMS111BVO;
import com.nanuri.rams.business.common.vo.IBIMS112BVO;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB05010ServiceImpl implements TB05010Service {

	private final RAA02BMapper raa02bMapper;
	private final RAA02HMapper raa02hMapper;
	private final RAA21BMapper raa21bMapper;
	private final RAA22BMapper raa22bMapper;
	private final RAA23BMapper raa23bMapper;

	private final IBIMS103BMapper ibims103BMapper;

	/* 위원회 기본정보 */
	private final IBIMS111BMapper ibims111BMapper;
	/* 위원회 안건정보 */
	private final IBIMS112BMapper ibims112BMapper;
	/* 위원회 위원정보 */
	private final IBIMS115BMapper ibims115BMapper;
	/* 오늘의 할일 INSERT */
	private final IBIMS100BMapper ibims100BMapper;

	/* 사용자 정보 */
	private final AuthenticationFacade facade;

	// 마지막 협의정보 검색
	@Override
	public IBIMS111BVO getLastCNFRNCInfo(IBIMS111BDTO paramData) {
		return ibims111BMapper.getLastCNFRNCInfo(paramData);
	}

	// 협의정보 - 리스트 검색
	@Override
	public List<IBIMS111BVO> getCNFRNCList(IBIMS111BDTO paramData) { return ibims111BMapper.getCNFRNCList(paramData); }

	// 협의정보 - 기본정보 검색
	@Override
	public IBIMS111BVO getCNFRNCInfo(IBIMS111BDTO paramData) {
		paramData.setCnsbOpnDt(DateUtil.changeDateFormat(paramData.getCnsbOpnDt(), "yyyyMMdd"));
		return ibims111BMapper.getCNFRNCInfo(paramData);
	}

	// 협의정보 - 위원정보 검색
	@Override
	public List<IBIMS115BVO> getMMBRInfo(IBIMS115BDTO paramData) {
		return ibims115BMapper.getMMBRInfo(paramData);
	}

	// 협의정보 - 안건정보 검색
	@Override
	public List<IBIMS112BVO> getCaseInfo(IBIMS112BDTO paramData) {
		return ibims112BMapper.getCaseInfo(paramData);
	}

	// 협의정보 - 안건정보 추가
	@Override
	public IBIMS103BVO getDealDetail(IBIMS103BDTO paramData) { return ibims103BMapper.selectOne103B(paramData); }

	// 임시저장 - 기본정보, 안건정보, 위원정보
	@Override
	public int tempSaveComtInfo(IBIMS111BDTO paramData) {
		paramData.setRsltRgstEmpno(facade.getDetails().getEno());
		paramData.setHndEmpno(facade.getDetails().getEno());

		for( int i = 0 ; i < paramData.getDealList().size() ; i ++ ) {
			paramData.getDealList().get(i).setHndEmpno(facade.getDetails().getEno());
		}

		List<IBIMS115BDTO> enoList = new ArrayList<IBIMS115BDTO>();
		IBIMS115BDTO enoInfo = new IBIMS115BDTO();
		for( int i = 0 ; i < paramData.getEnoList().size() ; i ++ ) {
			for(int j = 0 ; j < paramData.getDealList().size() ; j ++) {

				enoInfo = new IBIMS115BDTO();
				BeanUtils.copyProperties(paramData.getEnoList().get(i), enoInfo);

				// 사용자정보
				enoInfo.setHndEmpno(facade.getDetails().getEno());
				// 딜번호
				enoInfo.setDealNo(paramData.getDealList().get(j).getDealNo());

				// 안건구분코드
				enoInfo.setMtrDcd(paramData.getDealList().get(j).getMtrDcd());
				// 심사구분코드
				enoInfo.setJdgmDcd(paramData.getDealList().get(j).getJdgmDcd());

				enoList.add(enoInfo);
			}
		}

		/* 협의체 임시저장 */
		// 기본정보 삭제 IBIMS111B
		ibims111BMapper.delete111B(paramData);
		// 기본정보 저장 IBIMS111B
 		ibims111BMapper.insert111B(paramData);
		// 안건정보 삭제 IBIMS112B
		ibims112BMapper.delete112B(paramData);
		// 안건정보 저장 IBIMS112B
		ibims112BMapper.insert112B(paramData.getDealList());
		// 위원정보 삭제 IBIMS115B
		ibims115BMapper.delete115B(paramData);
		// 위원정보 저장 IBIMS115B
		ibims115BMapper.insert115B(enoList);

		// 안건정보 진행상태 업데이트 IBIMS103B
		for (IBIMS112BDTO item : paramData.getDealList()) {
			/* IBIMS103B 최종여부 변경 파라미터 */
			IBIMS103BDTO param = new IBIMS103BDTO();

			param.setLastYn("N");
			param.setHndEmpno(facade.getDetails().getEno());
			param.setDealNo(item.getDealNo());
			param.setMtrDcd(item.getMtrDcd());
			param.setJdgmDcd(item.getJdgmDcd());

			/* IBIMS103B 신규정보 생성 파라미터 */
			IBIMS103BDTO temp  = ibims103BMapper.selectOne103B(param);

			temp.setMtrPrgSttsDcd("303");
			temp.setHndEmpno(facade.getDetails().getEno());
			temp.setRiskInspctRsltnCcd(paramData.getCnsbDcd());

			/* 거래 실행 */
			ibims103BMapper.updateLastYn(param);
			ibims103BMapper.insert103B(temp);

		}

		// 안건진행상태구분코드 변경 IBIMS103B
		return 1;
	}

	// 준비확정 or 준비취소
	@Override
	public int changeCNFRNCStatus( IBIMS111BDTO paramData) {

		// cnsbDcd=1, rsltnYr=2023, sn=5->IBIMS115B 를 조회해서 LIST<IBIMS115BDTO> empList에 넣고
		// empList의 길이만큼 for 문 돌려서 위원수만큼 오늘의 할일 insert

		/* IBIMS100B INSERT를 위한 VO 인스턴스화 */
		IBIMS100BVO.selectVO ibims100BVO = new IBIMS100BVO.selectVO();

		// 협의체 회차정보 진행상태 업데이트 IBIMS111B
		ibims111BMapper.updatePrgSttsDcd(paramData);

		// 안건정보 진행상태 업데이트 IBIMS103B
		List<Map<String, Object>> dealParam = new ArrayList<>();

		for (IBIMS112BDTO item : paramData.getDealList()) {
			/* IBIMS103B 최종여부 변경 파라미터 */
			IBIMS103BDTO param = new IBIMS103BDTO();

			param.setLastYn("N");
			param.setHndEmpno(facade.getDetails().getEno());
			param.setDealNo(item.getDealNo());
			param.setMtrDcd(item.getMtrDcd());
			param.setJdgmDcd(item.getJdgmDcd());

			/* IBIMS103B 신규정보 생성 파라미터 */
			IBIMS103BDTO temp  = ibims103BMapper.selectOne103B(param);

			temp.setMtrPrgSttsDcd(paramData.getJdgmRsltDcd());
			temp.setHndEmpno(facade.getDetails().getEno());

			/* 거래 실행 */
			ibims103BMapper.updateLastYn(param);
			ibims103BMapper.insert103B(temp);
		}

		/* 위원정보 조회를 위한 IBIMS105B DTO 인스턴스화 */
		IBIMS115BDTO param115B = new IBIMS115BDTO();

		// parameter setting
		param115B.setCnsbDcd(paramData.getCnsbDcd());
		param115B.setRsltnYr(paramData.getRsltnYr());
		param115B.setSn(paramData.getSn());

		List<IBIMS115BVO> empList = ibims115BMapper.getMMBRInfo(param115B);

		for (IBIMS115BVO item : empList) {
			/* IBIMS100B 저장 or 삭제 */
			if (!paramData.getJdgmRsltDcd().equals("303")) {

				if ( item.getAtdcAngtEmpno().isEmpty() ) {
					ibims100BVO.setEmpno(item.getAtdcTrgtEmpno());					// 사원번호
				} else {
					ibims100BVO.setEmpno(item.getAtdcAngtEmpno());
				}

				ibims100BVO.setWorkDcd("03");                              			// 작업구분코드
				ibims100BVO.setWorkCtns("(To-Do) 협의체 의견등록(승인조건)");       // 작업내용
				ibims100BVO.setRgstEmpno(facade.getDetails().getEno());             // 등록사원번호
				ibims100BVO.setMenuId("/TB05020S");                               	// 메뉴ID
				ibims100BVO.setRmrk("dealNo=" + item.getDealNo());                  // 비고(메뉴별조회KEY)
				ibims100BVO.setHndEmpno(facade.getDetails().getEno());              // 조작사원번호

				ibims100BMapper.insertIBIMS100BInfo(ibims100BVO);
			} else {
				ibims100BVO.setRmrk(item.getDealNo());

				if ( item.getAtdcAngtEmpno().isEmpty() ) {
					ibims100BVO.setEmpno(item.getAtdcTrgtEmpno());					// 사원번호
				} else {
					ibims100BVO.setEmpno(item.getAtdcAngtEmpno());
				}

				ibims100BVO.setHndEmpno(facade.getDetails().getEno());
				ibims100BVO.setMenuId("/TB05020S");

				ibims100BMapper.deleteIBIMS100BInfo(ibims100BVO);
			}
		}
		return 1;
	}
}
