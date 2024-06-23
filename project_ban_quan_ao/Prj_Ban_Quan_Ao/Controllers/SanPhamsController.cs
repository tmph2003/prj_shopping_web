using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public SanPhamsController(DbQuanAoContext context)
        {
            _context = context;
        }

        [HttpGet("checkMaSanPham/{masanpham}")]
        public async Task<ActionResult<bool>> CheckMaSanPham(string masanpham)
        {
            var sanPham = await _context.SanPhams.FirstOrDefaultAsync(s => s.MaSanPham == masanpham);
            bool exists = sanPham != null;
            return exists;
        }

        // GET: api/SanPhams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetSanPhams()
        {
            return await _context.SanPhams.OrderByDescending(x => x.NgayTao).ToListAsync();
        }

        // GET: api/SanPhams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPham>> GetSanPham(Guid id)
        {
            var sanPham = await _context.SanPhams.FindAsync(id);

            if (sanPham == null)
            {
                return NotFound();
            }

            return sanPham;
        }

        // PUT: api/SanPhams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanPham(Guid id, SanPham sanPham)
        {
            if (id != sanPham.Id)
            {
                return BadRequest();
            }

            _context.Entry(sanPham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet("getsanphambypage/{idDanhMuc}/{page}")]
        public IActionResult GetSanPhamByPage(string idDanhMuc, int page)
        {
            var skiped = 20;
            if (idDanhMuc.ToString() == "00000000-0000-0000-0000-000000000000")
            {
                var query =
                            (from sp in _context.SanPhams
                             select sp).Skip(skiped * page).Take(skiped);
                return Ok(query);
            }
            else
            {
                var query =
                           (from sp in _context.SanPhams
                            where sp.LoaiSanPhamId.ToString() == idDanhMuc
                            select sp).Skip(skiped * page).Take(skiped);
                return Ok(query);
            }
        }

        [HttpGet("getallsanphambydanhmuc/{idDanhMuc}")]
        public IActionResult GetAllSanPhamByDanhMuc(string idDanhMuc)
        {   
            if(idDanhMuc.ToString() == "00000000-0000-0000-0000-000000000000")
            {
                var query =
                      (from sp in _context.SanPhams
                       select sp);
                return Ok(query.Count());
            }
            else
            {
                var query =
                      (from sp in _context.SanPhams
                       where sp.LoaiSanPhamId.ToString() == idDanhMuc
                       select sp);
                return Ok(query.Count());
            }
           
        }


        [HttpGet("getsanphambysearchkey/{searchKey}")]
        public IActionResult GetSanPhamBySearchKey(string searchKey)
        {
                var query =
                      (from sp in _context.SanPhams 
                       where sp.Ten != null && sp.Ten.Contains(searchKey)
                       select sp);
                return Ok(query);
        }

        [HttpGet("getsanphambydanhmuc/{idDanhMuc}")]
        public IActionResult GetSanPhamByDanhMuc(string idDanhMuc)
        {
            if (idDanhMuc.ToString() == "00000000-0000-0000-0000-000000000000")
            {
                var query =
                      (from sp in _context.SanPhams
                       select sp);
                return Ok(query);
            }
            else
            {
                var query =
                      (from sp in _context.SanPhams
                       where sp.LoaiSanPhamId.ToString() == idDanhMuc
                       select sp);
                return Ok(query);
            }

        }
        
        [HttpGet("getsanphammoive/{soSanPhamLay}")]
        public IActionResult GetSanPhamMoiVe(int soSanPhamLay)
        {
            var query = (from sp in _context.SanPhams
                         orderby sp.NgayTao descending
                         select sp
                         ).Take(10).ToList();
            return Ok(query);
        }

        [HttpGet("getsanphamnhieuluotmua")]
        public IActionResult GetSanPhamNhieuLuotMua()
        {
            var topSanPhamIds = _context.SanPhamDonHangs
           .GroupBy(sd => sd.SanPhamId)
           .OrderByDescending(g => g.Count())
           .Select(g => g.Key)
           .Take(7);

            var query = _context.SanPhams
                .Where(sp => topSanPhamIds.Contains(sp.Id))
                .OrderByDescending(sp => sp.NgayTao)
                .ToList();
            return Ok(query);
        }

        // POST: api/SanPhams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanPham>> PostSanPham(SanPham sanPham)
        {
            _context.SanPhams.Add(sanPham);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanPham", new { id = sanPham.Id }, sanPham);
        }

        // DELETE: api/SanPhams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanPham(Guid id)
        {
            var sanPham = await _context.SanPhams.FindAsync(id);
            if (sanPham == null)
            {
                return NotFound();
            }

            _context.SanPhams.Remove(sanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SanPhamExists(Guid id)
        {
            return _context.SanPhams.Any(e => e.Id == id);
        }

        [HttpGet("GetSoLuongLoaiSanPham")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetSoLuongLoaiSanPham()
        {
            var result = await _context.SanPhams
                .GroupBy(sp => new { sp.LoaiSanPhamId, sp.LoaiSanPham.TenLoai })
                .Select(g => new
                {
                    TenLoai = g.Key.TenLoai,
                    TongSoLuong = g.Sum(sp => sp.SoLuong)
                })
                .ToListAsync();

            return result;
        }
    }
}
