package com.nanuri.rams.business.dashboard.ds01030;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.DS01030SVO.Parameters;


@Service
public interface DS01030Service {
	
	List<Parameters> getData(Parameters param);

}
