package com.nanuri.rams.business.assessment.as04.as04220;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.mapper.RAA23BMapper;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.StringUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS04220ServiceImpl implements AS04220Service {

	private final RAA23BMapper raa23bMapper;

	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<DealInfo> getDealInfoByEno(SearchVO paramData) {
		paramData.setEno(facade.getDetails().getEno());
		return raa23bMapper.getDealInfoByEno(paramData);
	}

	@Override
	public int confirmFile(RAA23BDTO param) {
		String eno = facade.getDetails().getEno();

		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat sdf2 = new SimpleDateFormat("HHmmss");
		Date now = new Date();
		String timeDt = sdf1.format(now);
		String timeTm = sdf2.format(now);

		param.setAtdncPEno(facade.getDetails().getEno());

		param = raa23bMapper.selectRAA23BInfo(param);

		param.setCnfrPEno(eno);
		param.setCnfrF("Y");
		param.setCnfrDt(timeDt);
		param.setCnfrTm(timeTm);
		param.setHndlDprtCd(facade.getDetails().getDprtCd());
		param.setHndlPEno(eno);

		return raa23bMapper.updateRAA23BInfo(param);
	}

	@Override
	public int updateAprvOpstnCcd(RAA23BDTO param) {


		String eno = facade.getDetails().getEno();
		String aprvOpstnCcd = param.getAprvOpstnCcd();
		String rvwCmmtCntnt = param.getRvwCmmtCntnt();
		
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat sdf2 = new SimpleDateFormat("HHmmss");
		Date now = new Date();
		String timeDt = null;
		String realAtdncF = null;

		param.setAtdncPEno(facade.getDetails().getEno());
		param = raa23bMapper.selectRAA23BInfo(param);
		
		//if(!StringUtil.isAllWhitespace(aprvOpstnCcd)) {
			timeDt = sdf1.format(now);
			realAtdncF = "Y";
		//} else {
		//	rvwCmmtCntnt = null;
		//}

		param.setAprvOpstnCcd(aprvOpstnCcd);
		param.setRvwCmmtCntnt(rvwCmmtCntnt);
		param.setRealAtdncF(realAtdncF);
		param.setRgstDt(timeDt);
		param.setHndlDprtCd(facade.getDetails().getDprtCd());
		param.setHndlPEno(eno);

		return raa23bMapper.updateRAA23BInfo(param);
	}

}
