package com.nanuri.rams.business.assessment.tb06.tb06016;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.keygen.StringKeyGenerator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.nanuri.rams.com.security.AuthenticationFacade;

import com.nanuri.rams.business.common.mapper.IBIMS204BMapper;
import com.nanuri.rams.business.common.dto.IBIMS204BDTO;
import com.nanuri.rams.business.common.vo.IBIMS204BVO;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB06016ServiceImpl implements TB06016Service {
    
    private final IBIMS204BMapper ibims204bMapper;

    @Autowired
    private AuthenticationFacade facade;

	@Override
	public List<IBIMS204BDTO> selectIBIMS204B(IBIMS204BDTO data) {
		List<IBIMS204BDTO> result = ibims204bMapper.selectIBIMS204B(data);
		return result;
	}

	@Override
	public int insertIBIMS204B(IBIMS204BVO data) {
		data.setHndEmpno(facade.getDetails().getEno());
		data.setHndTmnlNo("");
		data.setHndTrId("");
		data.setGuid("");
		int result = ibims204bMapper.insertIBIMS204B(data);
		return result;
	}

	@Override
	public int updateIBIMS204B(IBIMS204BVO data) {
		data.setHndEmpno(facade.getDetails().getEno());
		data.setHndTmnlNo("");
		data.setHndTrId("");
		data.setGuid("");
		int result = ibims204bMapper.updateIBIMS204B(data);
		return result;
	}

	@Override
    public int deleteIBIMS204B(IBIMS204BVO data) {
		int result = ibims204bMapper.deleteIBIMS204B(data);

		List<IBIMS204BDTO> mdwyRdmpFeeRtoList = data.getMdwyRdmpFeeRtoList();

		for(int i=0; i < mdwyRdmpFeeRtoList.size(); i++){
			IBIMS204BDTO mdwyRdmpFeeRtoDTO = mdwyRdmpFeeRtoList.get(i);

			IBIMS204BVO parameter = new IBIMS204BVO();
			parameter.setPrdtCd(data.getPrdtCd());
			parameter.setFeeSn(mdwyRdmpFeeRtoDTO.getFeeSn());

			result = ibims204bMapper.deleteIBIMS204B(parameter);
		}

		return result;
	}


    
}
