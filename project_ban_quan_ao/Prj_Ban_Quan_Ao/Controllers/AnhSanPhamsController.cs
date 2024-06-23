using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;
using Minio;
using Minio.DataModel.Args;
using Minio.Exceptions;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnhSanPhamsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public AnhSanPhamsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/AnhSanPhams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnhSanPham>>> GetAnhSanPhams()
        {
            return await _context.AnhSanPhams.OrderByDescending(x=>x.NgayTao).ToListAsync();
        }

        // GET: api/AnhSanPhams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnhSanPham>> GetAnhSanPham(Guid id)
        {
            var anhSanPham = await _context.AnhSanPhams.FindAsync(id);

            if (anhSanPham == null)
            {
                return NotFound();
            }

            return anhSanPham;
        }

        // PUT: api/AnhSanPhams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnhSanPham(Guid id, AnhSanPham anhSanPham)
        {
            if (id != anhSanPham.Id)
            {
                return BadRequest();
            }

            _context.Entry(anhSanPham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnhSanPhamExists(id))
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


        [HttpGet("getanhsanphambysanpham/{idSanPham}")]
        public IActionResult getAnhSanPhamBySanPham(string idSanPham)
        {
            var query = (from asp in _context.AnhSanPhams
                         where asp.SanPhamId.ToString() == idSanPham
                         orderby asp.NgayTao
                         select asp);
            return Ok(query);
        }

        // POST: api/AnhSanPhams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AnhSanPham>> PostAnhSanPham(AnhSanPham anhSanPham)
        {
            _context.AnhSanPhams.Add(anhSanPham);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnhSanPham", new { id = anhSanPham.Id }, anhSanPham);
        }

        // DELETE: api/AnhSanPhams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnhSanPham(Guid id)
        {
            var anhSanPham = await _context.AnhSanPhams.FindAsync(id);
            if (anhSanPham == null)
            {
                return NotFound();
            }

            _context.AnhSanPhams.Remove(anhSanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnhSanPhamExists(Guid id)
        {
            return _context.AnhSanPhams.Any(e => e.Id == id);
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadImage()
        {
            var file = Request.Form.Files[0];
            if (file.Length == 0)
            {
                return BadRequest("Empty file uploaded");
            }

            // MinIO client configuration (improved security)
            const string endpoint = "minio:9000";
            const string accessKey = "zMotzREn1CgdxTX7lZ3s"; // Replace with your actual access key
            const string secretKey = "aHHwfbvBeC5qLdqAhIkEibIaAieBuFtpwgJ0YSWw"; // Replace with your actual secret key
            try
            {
                var minio = new MinioClient()
                    .WithEndpoint(endpoint)
                    .WithCredentials(accessKey, secretKey)
                    .WithSSL(false)
                    .Build();
                Run(minio, file).Wait();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


            return Ok("Uploaded successfully");
        }

        private async static Task Run(IMinioClient minio, IFormFile file)
        {
            var bucketName = "assets";
            var directoryPath = "AnhSanPham/";
            var objectName = directoryPath + file.FileName;
            var contentType = file.ContentType;
            try
            {
                var beArgs = new BucketExistsArgs()
                        .WithBucket(bucketName);
                bool found = await minio.BucketExistsAsync(beArgs).ConfigureAwait(false);
                if (!found)
                {
                    Console.WriteLine($"Not exist {bucketName}");
                    var mbArgs = new MakeBucketArgs()
                        .WithBucket(bucketName);
                    await minio.MakeBucketAsync(mbArgs).ConfigureAwait(false);
                }
                PutObjectArgs putObjectArgs = new PutObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectName)
                    .WithObjectSize(file.OpenReadStream().Length)
                    .WithStreamData(file.OpenReadStream())
                    .WithContentType(contentType);
                await minio.PutObjectAsync(putObjectArgs).ConfigureAwait(false);
                Console.WriteLine("Successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("File Upload Error: {0}", ex.Message);
            }
        }
    }
}
