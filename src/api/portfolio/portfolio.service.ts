import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/model/PortfolioEntity/portfolio.entity';
import { PortfolioModel } from 'src/model/PortfolioEntity/PortfolioModel';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  addPortfolioItem({
    title,
    projectUrl,
    coverUrl,
    clicksNumber,
  }): Promise<PortfolioModel> {
    const newItem = new PortfolioModel(
      title,
      projectUrl,
      coverUrl,
      clicksNumber,
    );

    return this.portfolioRepository.save(newItem);
  }

  getPortfolioItems(): Promise<PortfolioModel[]> {
    return this.portfolioRepository.query(`
    SELECT * from portfolio
    ORDER BY portfolio.created_at
    `);
  }

  getPortfolioItem(id) {
    return this.portfolioRepository.findOne(id);
  }

  public async editPortfolioItem(data) {
    const { id } = data;

    const oldProject = await this.portfolioRepository.findOne({ id });

    const project = await this.portfolioRepository.save({
      ...oldProject,
      ...data,
    });

    return project;
  }

  deletePortfolioItem(id) {
    return this.portfolioRepository.delete(id);
  }
}
